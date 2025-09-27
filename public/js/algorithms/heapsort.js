// --- Thuật toán: Sắp xếp vun đống (Heap Sort) ---
const HeapSort = {
    name: "Sắp xếp vun đống (Heap Sort)",
    code: `void heapify(vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest])
        largest = left;

    if (right < n && arr[right] > arr[largest])
        largest = right;

    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(vector<int>& arr) {
    int n = arr.size();

    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`,
    defaultInput: "12, 11, 13, 5, 6, 7",

    *tracer(nums) {
        const n = nums.length;
        yield { arr: [...nums], message: "Bắt đầu xây dựng heap tối đa.", line: 13 };

        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            yield* this.heapifyTracer(nums, n, i, true);
        }

        yield { arr: [...nums], message: "Hoàn thành xây dựng heap. Bắt đầu sắp xếp.", line: 17 };

        // Extract elements one by one
        for (let i = n - 1; i > 0; i--) {
            // Swap root with last element
            [nums[0], nums[i]] = [nums[i], nums[0]];
            yield { arr: [...nums], swapped: [0, i], message: `Hoán đổi root với phần tử cuối cùng: ${nums[i]} và ${nums[0]}.`, line: 18 };

            // Heapify the reduced heap
            yield* this.heapifyTracer(nums, i, 0, false);
        }

        yield { arr: [...nums], done: true, message: "Sắp xếp hoàn tất!" };
    },

    *heapifyTracer(arr, n, i, isBuild) {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        yield { arr: [...arr], heapifyIndex: i, left, right, largest, message: `Heapify tại chỉ số ${i}.`, line: isBuild ? 1 : 20 };

        if (left < n && arr[left] > arr[largest]) {
            largest = left;
            yield { arr: [...arr], heapifyIndex: i, left, right, largest, message: `Con trái ${arr[left]} > root ${arr[i]}, cập nhật largest = ${left}.`, line: 4 };
        }

        if (right < n && arr[right] > arr[largest]) {
            largest = right;
            yield { arr: [...arr], heapifyIndex: i, left, right, largest, message: `Con phải ${arr[right]} > largest ${arr[largest]}, cập nhật largest = ${right}.`, line: 7 };
        }

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            yield { arr: [...arr], heapifyIndex: i, left, right, largest, swapped: [i, largest], message: `Hoán đổi ${arr[largest]} và ${arr[i]}.`, line: 10 };
            yield* this.heapifyTracer(arr, n, largest, isBuild);
        } else {
            yield { arr: [...arr], heapifyIndex: i, left, right, largest, message: `Không cần hoán đổi, heapify hoàn tất tại ${i}.` };
        }
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

            if (step.swapped?.includes(index)) bar.classList.add('highlight-swap');
            if (index === step.heapifyIndex) bar.classList.add('highlight-heapify');
            if (index === step.left || index === step.right) bar.classList.add('highlight-child');
            if (index === step.largest && step.largest !== step.heapifyIndex) bar.classList.add('highlight-largest');

            wrapper.appendChild(valueLabel);
            wrapper.appendChild(bar);
            arrayContainer.appendChild(wrapper);
        });
    }
};
