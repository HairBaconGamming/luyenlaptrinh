// --- Thuật toán 4: Sắp xếp trộn (Merge Sort) ---
const MergeSort = {
    name: "Đệ quy: Sắp xếp trộn (Merge Sort)",
    code: `void merge(vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    vector<int> L(n1), R(n2);
    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
    
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    while (i < n1) {
        arr[k] = L[i];
        i++; k++;
    }
    while (j < n2) {
        arr[k] = R[j];
        j++; k++;
    }
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}`,
    defaultInput: "12, 11, 13, 5, 6, 7",

    *tracer(nums) {
        function* merge(arr, left, mid, right) {
            const n1 = mid - left + 1;
            const n2 = right - mid;
            const L = arr.slice(left, left + n1);
            const R = arr.slice(mid + 1, mid + 1 + n2);

            yield { arr: [...arr], left, mid, right, merging: true, message: `Trộn mảng từ ${left} đến ${right}.`, line: 1 };

            let i = 0, j = 0, k = left;
            while (i < n1 && j < n2) {
                yield { arr: [...arr], left, mid, right, i, j, k, merging: true, message: `So sánh L[${i}]=${L[i]} và R[${j}]=${R[j]}.`, line: 11 };
                if (L[i] <= R[j]) {
                    arr[k] = L[i];
                    yield { arr: [...arr], left, mid, right, i: i + 1, j, k: k + 1, merging: true, message: `Chọn ${L[i]} từ bên trái.`, line: 12 };
                    i++;
                } else {
                    arr[k] = R[j];
                    yield { arr: [...arr], left, mid, right, i, j: j + 1, k: k + 1, merging: true, message: `Chọn ${R[j]} từ bên phải.`, line: 16 };
                    j++;
                }
                k++;
            }
            while (i < n1) {
                arr[k] = L[i];
                yield { arr: [...arr], left, mid, right, i: i + 1, j, k: k + 1, merging: true, message: `Copy phần còn lại từ bên trái: ${L[i]}.`, line: 22 };
                i++; k++;
            }
            while (j < n2) {
                arr[k] = R[j];
                yield { arr: [...arr], left, mid, right, i, j: j + 1, k: k + 1, merging: true, message: `Copy phần còn lại từ bên phải: ${R[j]}.`, line: 26 };
                j++; k++;
            }
            yield { arr: [...arr], left, mid, right, merging: false, message: `Trộn hoàn tất cho đoạn ${left}-${right}.`, line: 1 };
        }

        function* mergeSortRecursive(arr, left, right) {
            if (left < right) {
                const mid = Math.floor(left + (right - left) / 2);
                yield { arr: [...arr], left, right, mid, message: `Chia mảng ${left}-${right} tại mid=${mid}.`, line: 32 };
                yield* mergeSortRecursive(arr, left, mid);
                yield* mergeSortRecursive(arr, mid + 1, right);
                yield* merge(arr, left, mid, right);
            } else {
                yield { arr: [...arr], left, right, message: `Mảng con ${left}-${right} đã đủ nhỏ.`, line: 31 };
            }
        }

        yield* mergeSortRecursive(nums, 0, nums.length - 1);
        yield { arr: [...nums], done: true, message: "Sắp xếp trộn hoàn tất!" };
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

            if (step.merging && (index >= step.left && index <= step.right)) bar.classList.add('highlight-i');
            if (index === step.k) bar.classList.add('highlight-update');

            wrapper.appendChild(valueLabel);
            wrapper.appendChild(bar);
            arrayContainer.appendChild(wrapper);
        });
    }
};
