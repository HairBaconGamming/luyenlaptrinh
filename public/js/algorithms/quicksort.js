// --- Thuật toán 2: Sắp xếp nhanh (Quick Sort) ---
const QuickSort = {
    name: "Đệ quy: Sắp xếp nhanh (Quick Sort)",
    code: `
int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);

    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
    defaultInput: "8, 2, 7, 4, 5, 3, 9, 1",

    *tracer(nums) {
        function swap(arr, i, j) { [arr[i], arr[j]] = [arr[j], arr[i]]; }

        function* partition(arr, low, high) {
            let pivot = arr[high];
            yield { arr: [...arr], low, high, pivotIndex: high, message: `Bắt đầu phân hoạch. Chọn pivot = ${pivot}.`, line: 2 };
            let i = low - 1;
            yield { arr: [...arr], low, high, pivotIndex: high, i, message: `Khởi tạo con trỏ 'i' tại ${i}.`, line: 3 };

            for (let j = low; j < high; j++) {
                yield { arr: [...arr], low, high, pivotIndex: high, i, j, message: `So sánh a[j]=${arr[j]} với pivot=${pivot}.`, line: 6 };
                if (arr[j] < pivot) {
                    i++;
                    yield { arr: [...arr], low, high, pivotIndex: high, i, j, message: `Điều kiện ĐÚNG. Tăng i lên ${i}.`, line: 7 };
                    swap(arr, i, j);
                    yield { arr: [...arr], low, high, pivotIndex: high, i, j, swapped: [i, j], message: `Hoán đổi a[i]=${arr[i]} và a[j]=${arr[j]}.`, line: 8 };
                }
            }
            swap(arr, i + 1, high);
            yield { arr: [...arr], low, high, pivotIndex: i + 1, swapped: [i+1, high], message: `Kết thúc phân hoạch. Đưa pivot về đúng vị trí ${i+1}.`, line: 11 };
            return i + 1;
        }

        function* quickSortRecursive(arr, low, high) {
            yield { arr: [...arr], low, high, range: [low, high], message: `Gọi quickSort(low=${low}, high=${high}).`, line: 16 };
            if (low < high) {
                const pi = yield* partition(arr, low, high);
                yield { arr: [...arr], partitionedIndex: pi, message: `Phân hoạch xong. Vị trí chốt là ${pi}.`, line: 18 };
                yield* quickSortRecursive(arr, low, pi - 1);
                yield* quickSortRecursive(arr, pi + 1, high);
            } else {
                yield { arr: [...arr], low, high, range: [low, high], message: `Điều kiện low < high là SAI. Mảng con đã được sắp xếp.`, line: 17 };
            }
        }
        yield* quickSortRecursive(nums, 0, nums.length - 1);
        yield { arr: [...nums], done: true, message: `Sắp xếp hoàn tất!` };
    },

    renderer: (step, container) => {
         container.innerHTML = `
            <div class="vis-row">
                <div class="vis-label">Trạng thái mảng</div>
                <div id="array-container" class="vis-element-container"></div>
            </div>`;
        const arrayContainer = container.querySelector('#array-container');
        const maxVal = Math.max(...step.arr, 1);

        step.arr.forEach((val, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'bar-wrapper';
            const valueLabel = document.createElement('div');
            valueLabel.className = 'bar-value';
            valueLabel.textContent = val;
            const bar = document.createElement('div');
            bar.className = 'vis-bar';
            bar.style.height = `${(val / maxVal) * 100 + 20}px`;

            if (index === step.pivotIndex) bar.classList.add('highlight-pivot');
            if (step.swapped?.includes(index)) bar.classList.add('highlight-update');
            if (step.partitionedIndex === index) bar.classList.add('partitioned');

            if (index === step.i) {
                 wrapper.innerHTML += `<div class="pointer pointer-i">i</div>`;
            }
             if (index === step.j) {
                 wrapper.innerHTML += `<div class="pointer pointer-j">j</div>`;
            }

            wrapper.appendChild(valueLabel);
            wrapper.appendChild(bar);
            arrayContainer.appendChild(wrapper);
        });
    }
};
