// --- Thuật toán: Sắp xếp đếm (Counting Sort) ---
const CountingSort = {
    name: "Sắp xếp đếm (Counting Sort)",
    code: `#include <vector>
#include <iostream>
using namespace std;

void countingSort(vector<int>& arr) {
    if (arr.empty()) return;
    
    int maxVal = *max_element(arr.begin(), arr.end());
    int minVal = *min_element(arr.begin(), arr.end());
    int range = maxVal - minVal + 1;
    
    vector<int> count(range, 0);
    vector<int> output(arr.size());
    
    // Count occurrences
    for (int num : arr) {
        count[num - minVal]++;
    }
    
    // Cumulative count
    for (int i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[arr[i] - minVal] - 1] = arr[i];
        count[arr[i] - minVal]--;
    }
    
    // Copy back to original
    for (int i = 0; i < arr.size(); i++) {
        arr[i] = output[i];
    }
}`,
    defaultInput: "170, 45, 75, 90, 802, 24, 2, 66",

    *tracer(nums) {
        if (nums.length === 0) {
            yield { arr: [...nums], message: "Mảng rỗng, không cần sắp xếp.", done: true };
            return;
        }

        const minVal = Math.min(...nums);
        const maxVal = Math.max(...nums);
        const range = maxVal - minVal + 1;
        let count = new Array(range).fill(0);
        let output = new Array(nums.length).fill(0);

        yield { arr: [...nums], minVal, maxVal, range, message: `Tìm min=${minVal}, max=${maxVal}, range=${range}.`, line: 7 };

        // Count occurrences
        for (let i = 0; i < nums.length; i++) {
            const num = nums[i];
            count[num - minVal]++;
            yield { arr: [...nums], count: [...count], i, num, message: `Đếm ${num}, count[${num - minVal}] = ${count[num - minVal]}.`, line: 12 };
        }

        yield { arr: [...nums], count: [...count], message: "Hoàn thành đếm tần suất.", line: 12 };

        // Cumulative count
        for (let i = 1; i < range; i++) {
            count[i] += count[i - 1];
            yield { arr: [...nums], count: [...count], i, message: `Tích lũy count[${i}] = ${count[i]}.`, line: 15 };
        }

        yield { arr: [...nums], count: [...count], message: "Hoàn thành tích lũy.", line: 15 };

        // Build output array
        for (let i = nums.length - 1; i >= 0; i--) {
            const num = nums[i];
            const index = count[num - minVal] - 1;
            output[index] = num;
            count[num - minVal]--;
            yield { arr: [...nums], output: [...output], count: [...count], i, num, index, message: `Đặt ${num} vào output[${index}].`, line: 18 };
        }

        // Copy back
        for (let i = 0; i < nums.length; i++) {
            nums[i] = output[i];
            yield { arr: [...nums], output: [...output], i, message: `Sao chép output[${i}] = ${nums[i]} vào arr[${i}].`, line: 22 };
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
                <div class="vis-label">Mảng đếm (shifted by min=${step.minVal})</div>
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
            const indices = Array.from({length: step.range}, (_, i) => i + step.minVal);
            indices.forEach((val, index) => {
                const wrapper = document.createElement('div');
                wrapper.className = 'bar-wrapper';
                const valueLabel = document.createElement('div');
                valueLabel.className = 'bar-value';
                valueLabel.textContent = `${val}: ${step.count[index]}`;
                const bar = document.createElement('div');
                bar.className = 'vis-bar';
                bar.style.height = `${(step.count[index] / Math.max(...step.count, 1)) * 100 + 20}px`;

                if (index === step.countIndex) bar.classList.add('highlight-count');

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
