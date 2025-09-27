// --- Thuật toán 5: Sắp xếp chọn (Selection Sort) ---
const SelectionSort = {
    name: "Sắp xếp chọn (Selection Sort)",
    code: `void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx != i) {
            swap(arr[i], arr[minIdx]);
        }
    }
}`,
    defaultInput: "64, 34, 25, 12, 22, 11, 90",

    *tracer(nums) {
        const n = nums.length;
        yield { arr: [...nums], message: "Bắt đầu sắp xếp chọn.", line: 2 };

        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            yield { arr: [...nums], i, message: `Bắt đầu tìm min từ vị trí ${i}.`, line: 3 };

            for (let j = i + 1; j < n; j++) {
                yield { arr: [...nums], i, j, minIdx, message: `So sánh arr[${j}] = ${nums[j]} với arr[${minIdx}] = ${nums[minIdx]}.`, line: 5 };
                if (nums[j] < nums[minIdx]) {
                    minIdx = j;
                    yield { arr: [...nums], i, j, minIdx, updated: true, message: `Cập nhật minIdx = ${minIdx}.`, line: 6 };
                }
            }

            if (minIdx !== i) {
                [nums[i], nums[minIdx]] = [nums[minIdx], nums[i]];
                yield { arr: [...nums], i, minIdx, swapped: [i, minIdx], message: `Hoán đổi arr[${i}] và arr[${minIdx}].`, line: 9 };
            } else {
                yield { arr: [...nums], i, minIdx, message: `Không cần hoán đổi, minIdx = ${i}.`, line: 8 };
            }
        }
        yield { arr: [...nums], done: true, message: "Sắp xếp hoàn tất!" };
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

            if (step.swapped?.includes(index)) bar.classList.add('highlight-update');
            if (index === step.i) bar.classList.add('highlight-i');
            if (index === step.minIdx) bar.classList.add('highlight-j'); // Reuse for min

            wrapper.appendChild(valueLabel);
            wrapper.appendChild(bar);
            arrayContainer.appendChild(wrapper);
        });
    }
};
