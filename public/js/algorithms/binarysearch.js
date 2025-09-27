// --- Thuật toán 8: Tìm kiếm nhị phân (Binary Search) ---
const BinarySearch = {
    name: "Tìm kiếm nhị phân (Binary Search)",
    code: `
int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
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

        let left = 0, right = nums.length - 1;
        yield { arr: [...nums], target, left, right, message: `Khởi tạo left = ${left}, right = ${right}.`, line: 4 };

        while (left <= right) {
            let mid = Math.floor(left + (right - left) / 2);
            yield { arr: [...nums], target, left, right, mid, message: `Tính mid = ${mid}, arr[${mid}] = ${nums[mid]}.`, line: 5 };

            if (nums[mid] === target) {
                yield { arr: [...nums], target, left, right, mid, found: true, message: `Tìm thấy ${target} tại vị trí ${mid}!`, line: 6 };
                return;
            } else if (nums[mid] < target) {
                yield { arr: [...nums], target, left, right, mid, message: `arr[${mid}] = ${nums[mid]} < ${target}, dịch left sang phải: left = ${mid + 1}.`, line: 9 };
                left = mid + 1;
            } else {
                yield { arr: [...nums], target, left, right, mid, message: `arr[${mid}] = ${nums[mid]} > ${target}, dịch right sang trái: right = ${mid - 1}.`, line: 11 };
                right = mid - 1;
            }
            yield { arr: [...nums], target, left, right, message: `Cập nhật phạm vi: left = ${left}, right = ${right}.`, line: 4 };
        }
        yield { arr: [...nums], target, left, right, found: false, message: `Không tìm thấy ${target} trong mảng.`, line: 13 };
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
            if (index === step.left) box.classList.add('highlight-i'); // Use highlight-i for left
            if (index === step.right) box.classList.add('highlight-j'); // Use highlight-j for right
            if (index === step.mid) box.classList.add('highlight-pivot'); // Use highlight-pivot for mid
            if (step.found && index === step.mid) box.classList.add('highlight-update'); // Found
            arrayContainer.appendChild(box);
        });
    }
};
