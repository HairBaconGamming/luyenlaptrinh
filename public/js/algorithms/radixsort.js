// --- Thuật toán: Sắp xếp cơ số (Radix Sort) ---
const RadixSort = {
    name: "Sắp xếp cơ số (Radix Sort)",
    code: `int getMax(vector<int>& arr) {
    int max = arr[0];
    for (int i = 1; i < arr.size(); i++)
        if (arr[i] > max) max = arr[i];
    return max;
}

void countSort(vector<int>& arr, int exp) {
    vector<int> output(arr.size());
    vector<int> count(10, 0);

    for (int i = 0; i < arr.size(); i++)
        count[(arr[i] / exp) % 10]++;

    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];

    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }

    for (int i = 0; i < arr.size(); i++)
        arr[i] = output[i];
}

void radixSort(vector<int>& arr) {
    int max = getMax(arr);
    for (int exp = 1; max / exp > 0; exp *= 10)
        countSort(arr, exp);
}`,
    defaultInput: "170, 45, 75, 90, 802, 24, 2, 66",

    *tracer(nums) {
        if (nums.length === 0) {
            yield { arr: [...nums], message: "Mảng rỗng, không cần sắp xếp.", done: true };
            return;
        }

        const max = Math.max(...nums);
        let exp = 1;

        yield { arr: [...nums], message: `Tìm max = ${max}, bắt đầu với exp = ${exp}.`, line: 22 };

        while (Math.floor(max / exp) > 0) {
            yield { arr: [...nums], exp, message: `Sắp xếp theo chữ số tại vị trí ${exp}.`, line: 23 };

            // Count sort for this digit
            const output = new Array(nums.length);
            const count = new Array(10).fill(0);

            // Count occurrences
            for (let i = 0; i < nums.length; i++) {
                const digit = Math.floor(nums[i] / exp) % 10;
                count[digit]++;
                yield { arr: [...nums], count: [...count], i, digit, message: `Đếm digit ${digit} của ${nums[i]}, count[${digit}] = ${count[digit]}.`, line: 8 };
            }

            // Cumulative count
            for (let i = 1; i < 10; i++) {
                count[i] += count[i - 1];
                yield { arr: [...nums], count: [...count], i, message: `Tích lũy count[${i}] = ${count[i]}.`, line: 11 };
            }

            // Build output
            for (let i = nums.length - 1; i >= 0; i--) {
                const digit = Math.floor(nums[i] / exp) % 10;
                const index = count[digit] - 1;
                output[index] = nums[i];
                count[digit]--;
                yield { arr: [...nums], output: [...output], count: [...count], i, digit, index, message: `Đặt ${nums[i]} vào output[${index}].`, line: 14 };
            }

            // Copy back
            for (let i = 0; i < nums.length; i++) {
                nums[i] = output[i];
                yield { arr: [...nums], output: [...output], i, message: `Sao chép output[${i}] = ${nums[i]} vào arr[${i}].`, line: 17 };
            }

            exp *= 10;
        }

        yield { arr: [...nums], done: true, message: "Sắp xếp hoàn tất!" };
    },

    renderer: (step, container) => {
        container.innerHTML = `
            <div class="vis-row">
                <div class="vis-label">Mảng gốc</div>
                <div id="array-container" class="vis-element-container"></div>
            </div>
            ${step.count ? `
            <div class="vis-row">
                <div class="vis-label">Mảng đếm (digits 0-9)</div>
                <div id="count-container" class="vis-element-container"></div>
            </div>
            ` : ''}
            ${step.output ? `
            <div class="vis-row">
                <div class="vis-label">Mảng output</div>
                <div id="output-container" class="vis-element-container"></div>
            </div>
            ` : ''}`;

        // Render array
        const arrayContainer = container.querySelector('#array-container');
        if (arrayContainer) {
            step.arr.forEach((val, index) => {
                const wrapper = document.createElement('div');
                wrapper.className = 'bar-wrapper';
                const valueLabel = document.createElement('div');
                valueLabel.className = 'bar-value';
                valueLabel.textContent = val;
                const bar = document.createElement('div');
                bar.className = 'vis-bar';
                bar.style.height = `${(val / Math.max(...step.arr, 1)) * 100 + 20}px`;

                if (step.i === index) bar.classList.add('highlight-current');
                if (step.placed?.includes(index)) bar.classList.add('highlight-place');

                wrapper.appendChild(valueLabel);
                wrapper.appendChild(bar);
                arrayContainer.appendChild(wrapper);
            });
        }

        // Render count array if present
        if (step.count && container.querySelector('#count-container')) {
            const countContainer = container.querySelector('#count-container');
            step.count.forEach((val, index) => {
                const wrapper = document.createElement('div');
                wrapper.className = 'bar-wrapper';
                const valueLabel = document.createElement('div');
                valueLabel.className = 'bar-value';
                valueLabel.textContent = `${index}: ${val}`;
                const bar = document.createElement('div');
                bar.className = 'vis-bar';
                bar.style.height = `${(val / Math.max(...step.count, 1)) * 100 + 20}px`;

                if (index === step.digit) bar.classList.add('highlight-count');

                wrapper.appendChild(valueLabel);
                wrapper.appendChild(bar);
                countContainer.appendChild(wrapper);
            });
        }

        // Render output if present
        if (step.output && container.querySelector('#output-container')) {
            const outputContainer = container.querySelector('#output-container');
            step.output.forEach((val, index) => {
                const wrapper = document.createElement('div');
                wrapper.className = 'bar-wrapper';
                const valueLabel = document.createElement('div');
                valueLabel.className = 'bar-value';
                valueLabel.textContent = val;
                const bar = document.createElement('div');
                bar.className = 'vis-bar';
                bar.style.height = `${(val / Math.max(...step.arr, 1)) * 100 + 20}px`;

                if (step.outputIndex === index) bar.classList.add('highlight-output');

                wrapper.appendChild(valueLabel);
                wrapper.appendChild(bar);
                outputContainer.appendChild(wrapper);
            });
        }
    }
};
