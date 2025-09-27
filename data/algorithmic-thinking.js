const algorithmicThinkingTopics = [
    {
        id: 'tu-duy-phan-tich-van-de',
        category: 'tu-duy-thuat-toan',
        title: 'Tư duy Phân tích Vấn đề: Phân tích và Mô hình hóa',
        content: `
            <h2>1. Phân tích Vấn đề (Problem Analysis)</h2>
            <p>Trước khi code, hiểu rõ input/output, ràng buộc, và edge cases. Trong Olympic, đọc đề cẩn thận để tránh hiểu lầm.</p>
            <ul>
                <li><strong>Input/Output:</strong> Xác định định dạng dữ liệu (n, m, arrays, strings).</li>
                <li><strong>Ràng buộc:</strong> Thời gian (O(n log n) hay O(n^2)?), không gian (memory limit).</li>
                <li><strong>Edge Cases:</strong> n=0, n=1, worst case (all equal, sorted).</li>
            </ul>

            <h2>2. Mô hình hóa Vấn đề</h2>
            <p>Chuyển vấn đề thực tế thành mô hình toán học/đồ thị. Ví dụ: Bài toán đường đi → Đồ thị, sắp xếp → So sánh.</p>

            <div class="content-code-block">
                <div class="code-block-header">Ví dụ: Phân tích bài "Sum of Subarray Minimums"</div>
                <pre><code class="language-cpp">
// Input: arr = [3,1,2,4], Output: 17 (min sums: 3+1+2+1+2+4+2+4=17)
// Ràng buộc: 1 <= n <= 3*10^4, 1 <= arr[i] <= 3*10^4
// Approach: Stack to find left/right smaller, O(n) time
                </code></pre>
            </div>

            <h2>3. Ứng dụng Olympic</h2>
            <p>- Đọc đề nhanh, vẽ sơ đồ cho graph problems.<br>
            - Luyện tập: Giải đề IOI/Olympic với time limit strict.</p>
        `
    },
    {
        id: 'phan-manh-van-de',
        category: 'tu-duy-thuat-toan',
        title: 'Phân mảnh Vấn đề: Decomposition và Abstraction',
        content: `
            <h2>1. Decomposition (Phân mảnh)</h2>
            <p>Chia vấn đề lớn thành các sub-problems nhỏ hơn. Ví dụ: Bài toán sắp xếp + tìm kiếm → Chia thành sort() và binary search().</p>

            <h2>2. Abstraction (Trừu tượng hóa)</h2>
            <p>Tập trung vào pattern chung, bỏ qua chi tiết không cần. Ví dụ: Tất cả sliding window problems đều dùng queue/deque để maintain min/max.</p>

            <div class="content-code-block">
                <div class="code-block-header">C++ - Sliding Window Maximum (Abstraction)</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;  // Indices of useful elements
    vector<int> res;
    for (int i = 0; i < nums.size(); i++) {
        while (!dq.empty() && dq.front() <= i - k) dq.pop_front();
        while (!dq.empty() && nums[dq.back()] < nums[i]) dq.pop_back();
        dq.push_back(i);
        if (i >= k - 1) res.push_back(nums[dq.front()]);
    }
    return res;
}
                </code></pre>
            </div>

            <h2>3. Pattern Recognition</h2>
            <p>Nhận diện patterns: Two Pointers cho sorted arrays, DP cho optimization, Greedy cho local optimal.</p>

            <h2>4. Luyện tập Olympic</h2>
            <p>- Phân tích đề "Longest Increasing Subsequence" thành DP.<br>
            - Sử dụng abstraction cho multiple test cases.</p>
        `
    },
    {
        id: 'chien-luoc-thiet-ke',
        category: 'tu-duy-thuat-toan',
        title: 'Chiến lược Thiết kế Thuật toán: Greedy, Divide & Conquer',
        content: `
            <h2>1. Greedy Algorithm</h2>
            <p>Chọn lựa chọn local optimal hy vọng dẫn đến global optimal. Áp dụng khi có tính chất "matroid" hoặc "greedy choice property".</p>
            <ul>
                <li>Ví dụ: Activity Selection - Chọn hoạt động kết thúc sớm nhất.</li>
            </ul>

            <div class="content-code-block">
                <div class="code-block-header">C++ - Greedy Activity Selection</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

int activitySelection(vector<pair<int, int>>& activities) {
    sort(activities.begin(), activities.end(), [](auto& a, auto& b) {
        return a.second < b.second;  // Sort by end time
    });
    int count = 1, lastEnd = activities[0].second;
    for (int i = 1; i < activities.size(); i++) {
        if (activities[i].first >= lastEnd) {
            count++;
            lastEnd = activities[i].second;
        }
    }
    return count;
}
                </code></pre>
            </div>

            <h2>2. Divide and Conquer</h2>
            <p>Chia vấn đề thành sub-problems độc lập, giải rồi merge. Ví dụ: Merge Sort, Quick Sort.</p>

            <h2>3. Dynamic Programming vs Greedy</h2>
            <p>Greedy nhanh hơn nhưng không luôn optimal; DP đảm bảo nhưng chậm hơn.</p>

            <h2>4. Ứng dụng Olympic</h2>
            <p>- Greedy cho "Fractional Knapsack".<br>
            - Luyện tập: "Greedy" tag trên Codeforces.</p>
        `
    },
    {
        id: 'debug-va-test',
        category: 'tu-duy-thuat-toan',
        title: 'Debugging và Testing: Kỹ năng Thi đấu',
        content: `
            <h2>1. Debugging Techniques</h2>
            <p>Sử dụng print statements, binary search on code, hoặc debugger. Trong Olympic, print key variables để trace.</p>

            <h2>2. Testing Strategies</h2>
            <ul>
                <li><strong>Small Test Cases:</strong> n=1, n=2 để verify logic.</li>
                <li><strong>Edge Cases:</strong> Min/max values, empty input.</li>
                <li><strong>Stress Test:</strong> Random large inputs để check time/space.</li>
            </ul>

            <div class="content-code-block">
                <div class="code-block-header">C++ - Debug với Prints</div>
                <pre><code class="language-cpp">
void debug(vector<int>& arr) {
    for (int x : arr) cout << x << " ";
    cout << endl;
}
// In function: debug(current_state);
                </code></pre>
            </div>

            <h2>3. Common Errors in Olympic</h2>
            <p>- Off-by-one (i < n vs i <= n).<br>
            - Integer overflow (use long long).<br>
            - TLE: Optimize O(n^2) to O(n log n).</p>

            <h2>4. Luyện tập</h2>
            <p>- Submit code với multiple test cases.<br>
            - Sử dụng online judges để test edge cases.</p>
        `
    },
    {
        id: 'ung-dung-thuc-te',
        category: 'tu-duy-thuat-toan',
        title: 'Ứng dụng Thực tế: Từ Thuật toán đến Giải quyết Vấn đề',
        content: `
            <h2>1. Kết hợp Các Kỹ thuật</h2>
            <p>Nhiều bài Olympic yêu cầu combine: Greedy + DP, BFS + Pruning.</p>

            <h2>2. Code Optimization</h2>
            <p>- Fast Input: Sử dụng scanf thay cin.<br>
            - Bit Manipulation cho speed.<br>
            - Precompute tables cho lookup nhanh.</p>

            <div class="content-code-block">
                <div class="code-block-header">C++ - Fast Input</div>
                <pre><code class="language-cpp">
ios_base::sync_with_stdio(false);
cin.tie(NULL);
// Or use scanf("%d", &x);
                </code></pre>
            </div>

            <h2>3. Mindset Olympic</h2>
            <p>- Time Management: Ưu tiên easy problems.<br>
            - Learn from WA: Analyze wrong answers.</p>

            <h2>4. Luyện tập Nâng cao</h2>
            <p>- Giải full contest trên Codeforces.<br>
            - Đọc editorials để học patterns mới.</p>
        `
    },
];

module.exports = algorithmicThinkingTopics;
