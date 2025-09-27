const dpTopics = [
    {
        id: 'gioi-thieu-qhd',
        category: 'quy-hoach-dong',
        title: 'Quy hoạch động: Tại sao và Khi nào?',
        content: `
            <h2>1. Sự lãng phí của Đệ quy</h2>
            <p>Hãy xem lại bài toán tính số Fibonacci. Với hàm đệ quy thông thường, rất nhiều giá trị bị tính đi tính lại nhiều lần, gây ra độ phức tạp thời gian theo cấp số nhân.</p>
            <h2>2. Hai Dấu hiệu nhận biết Quy hoạch động</h2>
            <ul>
                <li><strong>Bài toán con gối nhau (Overlapping Subproblems):</strong> Các bài toán con được tính đi tính lại nhiều lần.</li>
                <li><strong>Cấu trúc con tối ưu (Optimal Substructure):</strong> Lời giải tối ưu của bài toán lớn có thể được xây dựng từ lời giải tối ưu của các bài toán con.</li>
            </ul>
            <p>Quy hoạch động giải quyết vấn đề này bằng cách lưu lại kết quả của các bài toán con đã giải (memoization hoặc tabulation) để tái sử dụng.</p>
        `
    },
    {
        id: 'lis',
        category: 'quy-hoach-dong',
        title: 'QHD 1D: Dãy con tăng dài nhất',
        content: `
            <h2>1. Phát biểu bài toán</h2>
            <p>Cho một mảng số nguyên. Tìm độ dài của dãy con tăng dài nhất. Ví dụ: Với mảng <code>[10, 9, 2, 5, 3, 7, 101, 18]</code>, dãy con tăng dài nhất là <code>[2, 3, 7, 101]</code>, có độ dài là 4.</p>
            <h2>2. Xây dựng công thức</h2>
            <p>Gọi <code>dp[i]</code> là độ dài của dãy con tăng dài nhất <strong>kết thúc tại phần tử <code>a[i]</code></strong>.</p>
            <p>Công thức truy hồi là: <code>dp[i] = 1 + max(dp[j])</code> với mọi <code>0 ≤ j < i</code> và <code>a[j] < a[i]</code>.</p>
            <p>Kết quả cuối cùng của bài toán là giá trị lớn nhất trong mảng <code>dp</code>.</p>

            <div class="content-code-block">
                <div class="code-block-header">C++</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>

int lengthOfLIS(std::vector<int>& nums) {
    if (nums.empty()) {
        return 0;
    }

    int n = nums.size();
    std::vector<int> dp(n, 1);
    int maxLength = 1;

    for (int i = 1; i < n; ++i) {
        for (int j = 0; j < i; ++j) {
            if (nums[i] > nums[j]) {
                dp[i] = std::max(dp[i], 1 + dp[j]);
            }
        }
        maxLength = std::max(maxLength, dp[i]);
    }

    return maxLength;
}
                </code></pre>
            </div>
        `
    },
    {
        id: 'fibonacci-memo',
        category: 'quy-hoach-dong',
        title: 'Memoization: Fibonacci và Ứng dụng Olympic',
        content: `
            <h2>1. Fibonacci đệ quy với Memoization</h2>
            <p>Sử dụng mảng memo để lưu kết quả đã tính, tránh tính lại.</p>

            <div class="content-code-block">
                <div class="code-block-header">C++</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

int memo[1001];
int fib(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    return memo[n] = fib(n-1) + fib(n-2);
}

int main() {
    memset(memo, -1, sizeof(memo));
    cout << fib(10) << endl;  // 55
    return 0;
}
                </code></pre>
            </div>

            <h2>2. Tabulation (Bottom-up)</h2>
            <p>Xây dựng từ base case lên, sử dụng vòng lặp thay vì đệ quy.</p>

            <div class="content-code-block">
                <div class="code-block-header">C++</div>
                <pre><code class="language-cpp">
int fibTab(int n) {
    if (n <= 1) return n;
    vector<int> dp(n+1);
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}
                </code></pre>
            </div>

            <h2>3. Ứng dụng Olympic</h2>
            <p>- Coin Change: Số cách đổi tiền với memo.<br>
            - Luyện tập: "Fibonacci Number" trên LeetCode, hoặc DP trên cây Olympic.</p>
        `
    },
    {
        id: 'knapsack-01',
        category: 'quy-hoach-dong',
        title: '0/1 Knapsack: Bài toán Ba lô Olympic',
        content: `
            <h2>1. Phát biểu bài toán</h2>
            <p>Cho n vật phẩm với trọng lượng w[i] và giá trị v[i]. Chọn tập con vật phẩm sao cho tổng trọng lượng <= W và tổng giá trị lớn nhất.</p>

            <h2>2. Công thức DP</h2>
            <p>dp[i][w] = max(dp[i-1][w], dp[i-1][w - w[i]] + v[i]) nếu w >= w[i], else dp[i-1][w].</p>

            <div class="content-code-block">
                <div class="code-block-header">C++</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

int knapsack(int W, vector<int>& wt, vector<int>& val, int n) {
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (wt[i-1] <= w) {
                dp[i][w] = max(dp[i-1][w], dp[i-1][w - wt[i-1]] + val[i-1]);
            } else {
                dp[i][w] = dp[i-1][w];
            }
        }
    }
    return dp[n][W];
}

int main() {
    vector<int> val = {60, 100, 120};
    vector<int> wt = {10, 20, 30};
    int W = 50;
    cout << knapsack(W, wt, val, 3) << endl;  // 220
    return 0;
}
                </code></pre>
            </div>

            <h2>3. Tối ưu Space</h2>
            <p>Sử dụng 1D array: for (int i = 1; i <= n; i++) for (int w = W; w >= wt[i-1]; w--) dp[w] = max(dp[w], dp[w - wt[i-1]] + val[i-1]);</p>

            <h2>4. Luyện tập Olympic</h2>
            <p>Bài tập: "0/1 Knapsack" trên SPOJ hoặc UVa, biến thể unbounded knapsack.</p>
        `
    },
    {
        id: 'lcs',
        category: 'quy-hoach-dong',
        title: 'QHD 2D: Dãy con chung dài nhất (LCS)',
        content: `
            <h2>1. Phát biểu bài toán</h2>
            <p>Cho hai chuỗi X và Y, tìm độ dài dãy con chung dài nhất (không nhất thiết liên tiếp).</p>

            <h2>2. Công thức</h2>
            <p>dp[i][j] = dp[i-1][j-1] + 1 nếu X[i-1] == Y[j-1], else max(dp[i-1][j], dp[i][j-1]).</p>

            <div class="content-code-block">
                <div class="code-block-header">C++</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

int lcs(string X, string Y) {
    int m = X.size(), n = Y.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (X[i-1] == Y[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    return dp[m][n];
}

int main() {
    string X = "AGGTAB";
    string Y = "GXTXAYB";
    cout << lcs(X, Y) << endl;  // 4 (GTAB)
    return 0;
}
                </code></pre>
            </div>

            <h2>3. Ứng dụng Olympic</h2>
            <p>- Longest Common Subsequence cho so sánh DNA hoặc edit distance.<br>
            - Luyện tập: "LCS" trên Codeforces, biến thể với modulo.</p>
        `
    },
];

module.exports = dpTopics;
