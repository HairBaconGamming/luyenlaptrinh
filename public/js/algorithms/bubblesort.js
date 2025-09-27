// --- Thuật toán 3: Sắp xếp nổi bọt (Bubble Sort) ---
const BubbleSort = {
    name: "Sắp xếp nổi bọt (Bubble Sort)",
    code: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`,
    defaultInput: "64, 34, 25, 12, 22, 11, 90",

    *tracer(nums) {
        const n = nums.length;
        yield { arr: [...nums], message: "Bắt đầu sắp xếp nổi bọt.", line: 2 };

        for (let i = 0; i < n - 1; i++) {
            yield { arr: [...nums], i, message: `Bắt đầu pass ${i + 1}.`, line: 3 };
            for (let j = 0; j < n - i - 1; j++) {
                yield { arr: [...nums], i, j, message: `So sánh arr[${j}] = ${nums[j]} và arr[${j + 1}] = ${nums[j + 1]}.`, line: 5 };
                if (nums[j] > nums[j + 1]) {
                    [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
                    yield { arr: [...nums], i, j, swapped: [j, j + 1], message: `Hoán đổi vì ${nums[j + 1]} > ${nums[j]}.`, line: 6 };
                } else {
                    yield { arr: [...nums], i, j, message: `Không cần hoán đổi.`, line: 5 };
                }
            }
            yield { arr: [...nums], i, message: `Kết thúc pass ${i + 1}. Phần tử lớn nhất đã ở đúng vị trí.`, line: 3 };
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
            if (index === step.j || index === step.j + 1) bar.classList.add('highlight-i');

            wrapper.appendChild(valueLabel);
            wrapper.appendChild(bar);
            arrayContainer.appendChild(wrapper);
        });
    }
};
