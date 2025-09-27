// --- Thuật toán 4: Sắp xếp chèn (Insertion Sort) ---
const InsertionSort = {
    name: "Sắp xếp chèn (Insertion Sort)",
    code: `void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
    defaultInput: "64, 34, 25, 12, 22, 11, 90",

    *tracer(nums) {
        const n = nums.length;
        yield { arr: [...nums], message: "Bắt đầu sắp xếp chèn.", line: 2 };

        for (let i = 1; i < n; i++) {
            let key = nums[i];
            let j = i - 1;
            yield { arr: [...nums], i, j: j + 1, key, message: `Chọn key = ${key} tại vị trí ${i}.`, line: 3 };

            while (j >= 0 && nums[j] > key) {
                nums[j + 1] = nums[j];
                yield { arr: [...nums], i, j, key, shifted: [j + 1], message: `Dịch chuyển arr[${j}] = ${nums[j + 1]} sang phải.`, line: 5 };
                j--;
            }
            nums[j + 1] = key;
            yield { arr: [...nums], i, j: j + 1, key, inserted: [j + 1], message: `Chèn key ${key} vào vị trí ${j + 1}.`, line: 7 };
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

            if (step.shifted?.includes(index)) bar.classList.add('highlight-update');
            if (step.inserted?.includes(index)) bar.classList.add('highlight-insert');
            if (index === step.i) bar.classList.add('highlight-key');
            if (index === step.j) bar.classList.add('highlight-i');

            wrapper.appendChild(valueLabel);
            wrapper.appendChild(bar);
            arrayContainer.appendChild(wrapper);
        });
    }
};
