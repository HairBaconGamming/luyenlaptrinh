// --- Thuật toán 10: Tìm kiếm nội suy (Interpolation Search) ---
const InterpolationSearch = {
    name: "Tìm kiếm nội suy (Interpolation Search)",
    code: `
int interpolationSearch(vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        if (low == high) {
            if (arr[low] == target) return low;
            return -1;
        }
        int pos = low + (((double)(high - low) / (arr[high] - arr[low])) * (target - arr[low]));
        if (arr[pos] == target) {
            return pos;
        } else if (arr[pos] < target) {
            low = pos + 1;
        } else {
            high = pos - 1;
        }
    }
    return -1;
}`,
    defaultInput: "1, 3, 5, 7, 9, 11, 13, 15",
    defaultTarget: 7,

    *tracer(nums, target) {
        // Sort the array first
        nums.sort((a, b) => a - b);
        yield { arr: [...nums], target, message: `Mảng đã được sắp xếp: [${nums.join(', ')}]. Bắt đầu tìm kiếm ${target}.`, line: 3 };

        let low = 0, high = nums.length - 1;
        yield { arr: [...nums], target, low, high, message: `Khởi tạo low = ${low}, high = ${high}.`, line: 4 };

        while (low <= high && target >= nums[low] && target <= nums[high]) {
            if (low === high) {
                if (nums[low] === target) {
                    yield { arr: [...nums], target, low, high, found: true, message: `Tìm thấy ${target} tại vị trí ${low}!`, line: 6 };
                    return;
                } else {
                    yield { arr: [...nums], target, low, high, found: false, message: `Không tìm thấy ${target}.`, line: 7 };
                    return;
                }
            }
            let pos = low + Math.floor(((high - low) / (nums[high] - nums[low])) * (target - nums[low]));
            yield { arr: [...nums], target, low, high, pos, message: `Tính pos = ${pos}, arr[${pos}] = ${nums[pos]}.`, line: 9 };

            if (nums[pos] === target) {
                yield { arr: [...nums], target, low, high, pos, found: true, message: `Tìm thấy ${target} tại vị trí ${pos}!`, line: 10 };
                return;
            } else if (nums[pos] < target) {
                yield { arr: [...nums], target, low, high, pos, message: `arr[${pos}] = ${nums[pos]} < ${target}, dịch low sang phải: low = ${pos + 1}.`, line: 13 };
                low = pos + 1;
            } else {
                yield { arr: [...nums], target, low, high, pos, message: `arr[${pos}] = ${nums[pos]} > ${target}, dịch high sang trái: high = ${pos - 1}.`, line: 15 };
                high = pos - 1;
            }
            yield { arr: [...nums], target, low, high, message: `Cập nhật phạm vi: low = ${low}, high = ${high}.`, line: 4 };
        }
        yield { arr: [...nums], target, low, high, found: false, message: `Không tìm thấy ${target} trong mảng.`, line: 17 };
    },

    renderer: (step, container) => {
        container.innerHTML = `
            <div class="vis-row">
                <div class="vis-label">Mảng đã sắp xếp</div>
                <div id="array-container" class="vis-element-container"></div>
            </div>
            <div class="vis-row">
                <div class="vis-label">Giá trị cần tìm: ${step.target}</div>
            </div>`;

        const arrayContainer = container.querySelector('#array-container');

        step.arr.forEach((val, index) => {
            const box = document.createElement('div');
            box.className = 'vis-box';
            box.textContent = val;
            if (index === step.low) box.classList.add('highlight-i'); // Low
            if (index === step.high) box.classList.add('highlight-j'); // High
            if (index === step.pos) box.classList.add('highlight-pivot'); // Pos
            if (step.found && index === step.pos) box.classList.add('highlight-update'); // Found
            arrayContainer.appendChild(box);
        });
    }
};
