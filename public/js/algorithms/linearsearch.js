// --- Thuật toán 9: Tìm kiếm tuyến tính (Linear Search) ---
const LinearSearch = {
    name: "Tìm kiếm tuyến tính (Linear Search)",
    code: `
int linearSearch(vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
    defaultInput: "1, 3, 5, 7, 9, 11, 13, 15",
    defaultTarget: 7,

    *tracer(nums, target) {
        yield { arr: [...nums], target, message: `Bắt đầu tìm kiếm ${target} trong mảng: [${nums.join(', ')}].`, line: 3 };

        for (let i = 0; i < nums.length; i++) {
            yield { arr: [...nums], target, i, message: `Kiểm tra arr[${i}] = ${nums[i]}.`, line: 4 };

            if (nums[i] === target) {
                yield { arr: [...nums], target, i, found: true, message: `Tìm thấy ${target} tại vị trí ${i}!`, line: 5 };
                return;
            } else {
                yield { arr: [...nums], target, i, message: `arr[${i}] = ${nums[i]} != ${target}, tiếp tục.`, line: 3 };
            }
        }
        yield { arr: [...nums], target, found: false, message: `Không tìm thấy ${target} trong mảng.`, line: 7 };
    },

    renderer: (step, container) => {
        container.innerHTML = `
            <div class="vis-row">
                <div class="vis-label">Mảng</div>
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
            if (index === step.i) box.classList.add('highlight-i'); // Highlight current index
            if (step.found && index === step.i) box.classList.add('highlight-update'); // Found
            arrayContainer.appendChild(box);
        });
    }
};
