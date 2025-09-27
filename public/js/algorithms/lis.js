// --- Thuật toán 1: Dãy con tăng dài nhất (LIS) ---
const LIS = {
    name: "Quy hoạch động: Dãy con tăng dài nhất (LIS)",
    code: `int lengthOfLIS(vector<int>& nums) {
    if (nums.empty()) {
        return 0;
    }

    int n = nums.size();
    vector<int> dp(n, 1);
    int maxLength = 1;

    for (int i = 1; i < n; ++i) {
        for (int j = 0; j < i; ++j) {
            if (nums[i] > nums[j]) {
                if (dp[i] < 1 + dp[j]) {
                    dp[i] = 1 + dp[j];
                }
            }
        }
        maxLength = max(maxLength, dp[i]);
    }

    return maxLength;`,
    defaultInput: "10, 9, 2, 5, 3, 7, 101, 18",

    // Tracer: Chạy thuật toán và yield trạng thái tại mỗi bước
    *tracer(nums) {
        const n = nums.length;
        if (n === 0) return;
        let dp = new Array(n).fill(1);
        yield { dp: [...dp], message: "Khởi tạo mảng dp với các giá trị là 1.", line: 7 };

        let maxLength = 1;
        yield { dp: [...dp], message: "Khởi tạo maxLength = 1.", line: 8 };

        for (let i = 1; i < n; i++) {
            yield { dp: [...dp], i, message: `Bắt đầu vòng lặp với i=${i}. Xét a[${i}]=${nums[i]}.`, line: 10 };
            for (let j = 0; j < i; j++) {
                yield { dp: [...dp], i, j, message: `So sánh a[${i}] (${nums[i]}) với a[${j}] (${nums[j]}).`, line: 12 };
                if (nums[i] > nums[j]) {
                    yield { dp: [...dp], i, j, message: `Điều kiện a[${i}] > a[${j}] là ĐÚNG.`, line: 13 };
                    if (dp[i] < 1 + dp[j]) {
                        const old_dp_i = dp[i];
                        dp[i] = 1 + dp[j];
                        yield { dp: [...dp], i, j, updatedIndex: i, message: `dp[${i}] (${old_dp_i}) < 1+dp[${j}] (${dp[j]}) là ĐÚNG. Cập nhật dp[${i}] = ${dp[i]}.`, line: 14 };
                    } else {
                        yield { dp: [...dp], i, j, message: `dp[${i}] (${dp[i]}) >= 1+dp[${j}] (${dp[j]}) là SAI. Không cập nhật.`, line: 13 };
                    }
                }
            }
            maxLength = Math.max(maxLength, dp[i]);
            yield { dp: [...dp], i, maxLength, message: `Kết thúc vòng lặp cho i=${i}. Cập nhật maxLength = ${maxLength}.`, line: 18 };
        }
        yield { dp: [...dp], maxLength, done: true, message: `Hoàn tất. Kết quả cuối cùng là ${maxLength}.`, line: 21 };
    },

    // Renderer: Nhận trạng thái và vẽ lên DOM
    renderer: (step, container, originalNums) => {
        container.innerHTML = `
            <div class="vis-row">
                <div class="vis-label">Mảng đầu vào (A)</div>
                <div id="array-container" class="vis-element-container"></div>
            </div>
            <div class="vis-row">
                <div class="vis-label">Mảng quy hoạch động (DP)</div>
                <div id="dp-container" class="vis-element-container"></div>
            </div>`;

        const arrayContainer = container.querySelector('#array-container');
        const dpContainer = container.querySelector('#dp-container');

        originalNums.forEach((val, index) => {
            const box = document.createElement('div');
            box.className = 'vis-box';
            box.textContent = val;
            if (index === step.i) box.classList.add('highlight-i');
            if (index === step.j) box.classList.add('highlight-j');
            arrayContainer.appendChild(box);
        });

        step.dp.forEach((val, index) => {
            const box = document.createElement('div');
            box.className = 'vis-box';
            box.textContent = val !== undefined ? val : '?';
            if (index === step.i) box.classList.add('highlight-i');
            if (index === step.updatedIndex) box.classList.add('highlight-update');
            dpContainer.appendChild(box);
        });
    }
};
