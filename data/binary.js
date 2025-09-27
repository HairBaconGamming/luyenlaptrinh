const binaryTopics = [
    {
        id: 'gioi-thieu-nhi-phan',
        category: 'nhi-phan',
        title: 'Hệ nhị phân và Ứng dụng trong Olympic Tin học',
        content: `
            <h2>1. Hệ nhị phân là gì?</h2>
            <p>Hệ nhị phân (binary system) là hệ đếm sử dụng chỉ 2 chữ số: 0 và 1. Đây là nền tảng của máy tính hiện đại, vì các mạch điện tử chỉ có thể biểu diễn hai trạng thái: bật (1) hoặc tắt (0). Trong lập trình thi đấu, hiểu nhị phân giúp tối ưu hóa thuật toán và xử lý dữ liệu hiệu quả.</p>

            <h2>2. Chuyển đổi giữa các hệ cơ số</h2>
            <p>Chuyển thập phân sang nhị phân: Chia liên tiếp cho 2, ghi số dư từ dưới lên. Ví dụ: 10<sub>10</sub> = 1010<sub>2</sub>.</p>
            <p>Ngược lại, từ nhị phân sang thập phân: Nhân từng bit với lũy thừa 2 tương ứng.</p>

            <div class="content-code-block">
                <div class="code-block-header">C++</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

string decimalToBinary(int n) {
    if (n == 0) return "0";
    string binary = "";
    while (n > 0) {
        binary = (n % 2 == 0 ? "0" : "1") + binary;
        n /= 2;
    }
    return binary;
}

int main() {
    cout << decimalToBinary(10) << endl;  // Output: 1010
    return 0;
}
                </code></pre>
            </div>

            <h2>3. Phép toán Bitwise (Quan trọng cho Olympic)</h2>
            <p>Phép toán bitwise thao tác trực tiếp trên bit của số nguyên, rất nhanh và thường dùng trong tối ưu hóa.</p>
            <ul>
                <li><strong>AND (&amp;):</strong> Bit 1 nếu cả hai bit đều 1. Dùng để kiểm tra bit cụ thể hoặc mask.</li>
                <li><strong>OR (|):</strong> Bit 1 nếu ít nhất một bit là 1. Dùng để set bit.</li>
                <li><strong>XOR (^):</strong> Bit 1 nếu hai bit khác nhau. Dùng để flip bit hoặc tìm bit khác biệt.</li>
                <li><strong>NOT (~):</strong> Đảo bit (1 thành 0 và ngược lại).</li>
                <li><strong>Left Shift (<<):</strong> Dịch trái, nhân với 2^k.</li>
                <li><strong>Right Shift (>>):</strong> Dịch phải, chia cho 2^k.</li>
            </ul>
            <p>Ví dụ: Kiểm tra số chẵn/lẻ: n &amp; 1 == 0 (chẵn).</p>

            <div class="content-code-block">
                <div class="code-block-header">C++</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

int main() {
    int a = 5;  // 101 in binary
    int b = 3;  // 011 in binary
    
    cout << (a &amp; b) << endl;  // 001 = 1
    cout << (a | b) << endl;  // 111 = 7
    cout << (a ^ b) << endl;  // 110 = 6
    cout << (~a) << endl;     // -6 (two's complement)
    cout << (a << 1) << endl;  // 10 = 5*2
    cout << (a >> 1) << endl;  // 2 = 5/2
    
    // Kiểm tra bit thứ k (0-based)
    int k = 0;
    if (a &amp; (1 << k)) {
        cout << "Bit " << k << " is set" << endl;
    }
    return 0;
}
                </code></pre>
            </div>

            <h2>4. Tìm kiếm Nhị phân (Binary Search)</h2>
            <p>Tìm kiếm nhị phân là thuật toán chia đôi mảng đã sắp xếp để tìm phần tử, độ phức tạp O(log n). Rất phổ biến trong Olympic.</p>

            <div class="content-code-block">
                <div class="code-block-header">C++</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;  // Tránh overflow
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;  // Không tìm thấy
}

int main() {
    vector<int> arr = {1, 3, 5, 7, 9};
    int target = 5;
    int index = binarySearch(arr, target);
    cout << "Found at index: " << index << endl;  // Output: 2
    return 0;
}
                </code></pre>
            </div>

            <h2>5. Ứng dụng nâng cao trong Olympic</h2>
            <p>- Sử dụng bitmask để đại diện tập hợp (ví dụ: trạng thái subset trong DP).<br>
            - Bit manipulation để tối ưu hóa phép toán trên số lớn (như kiểm tra prime nhanh).<br>
            - Binary lifting cho LCA hoặc nhảy nhanh trên cây.</p>
            <p>Luyện tập: Giải bài như "Subset Sum" dùng bitmask hoặc "Fast Exponentiation" dùng shift.</p>
        `
    },
    {
        id: 'bitwise-advanced',
        category: 'nhi-phan',
        title: 'Phép toán Bitwise Nâng cao và Ứng dụng Olympic',
        content: `
            <h2>1. Đếm số bit 1 (Population Count)</h2>
            <p>Đếm số bit 1 trong biểu diễn nhị phân của số, thường dùng trong DP bitmask hoặc kiểm tra parity.</p>
            <p>Cách nhanh: Sử dụng __builtin_popcount() trong GCC, hoặc vòng lặp Brian Kernighan.</p>

            <div class="content-code-block">
                <div class="code-block-header">C++</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

int countSetBits(int n) {
    int count = 0;
    while (n) {
        n &= (n - 1);  // Brian Kernighan algorithm
        count++;
    }
    return count;
}

int main() {
    cout << countSetBits(13) << endl;  // 13 = 1101, output: 3
    return 0;
}
                </code></pre>
            </div>

            <h2>2. Swap hai số mà không dùng biến tạm</h2>
            <p>Sử dụng XOR: a = a ^ b; b = a ^ b; a = a ^ b;</p>

            <div class="content-code-block">
                <div class="code-block-header">C++</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

int main() {
    int a = 5, b = 3;
    a = a ^ b;
    b = a ^ b;
    a = a ^ b;
    cout << "a: " << a << ", b: " << b << endl;  // a: 3, b: 5
    return 0;
}
                </code></pre>
            </div>

            <h2>3. Ứng dụng Olympic: Kiểm tra số nguyên tố nhanh</h2>
            <p>Sử dụng bit manipulation để kiểm tra số nguyên tố bằng trial division tối ưu.</p>

            <div class="content-code-block">
                <div class="code-block-header">C++</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

bool isPrime(int n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if ((n & 1) == 0 || n % 3 == 0) return false;
    for (int i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) return false;
    }
    return true;
}

int main() {
    cout << (isPrime(17) ? "Prime" : "Not Prime") << endl;  // Prime
    return 0;
}
                </code></pre>
            </div>

            <h2>4. Luyện tập Olympic</h2>
            <p>Bài tập: Tìm số bit khác biệt giữa hai số (XOR và popcount). Hoặc giải "Hamming Distance" trên các nền tảng như Codeforces.</p>
        `
    },
    {
        id: 'binary-search-variants',
        category: 'nhi-phan',
        title: 'Biến thể Tìm kiếm Nhị phân trong Olympic',
        content: `
            <h2>1. Lower Bound (Tìm vị trí đầu tiên >= target)</h2>
            <p>Hữu ích khi mảng có phần tử trùng lặp, tìm vị trí chèn nhỏ nhất.</p>

            <div class="content-code-block">
                <div class="code-block-header">C++</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

int lowerBound(vector<int>& arr, int target) {
    int left = 0, right = arr.size();
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}

int main() {
    vector<int> arr = {1, 3, 3, 5, 7};
    cout << lowerBound(arr, 3) << endl;  // Output: 1 (first 3)
    return 0;
}
                </code></pre>
            </div>

            <h2>2. Upper Bound (Tìm vị trí đầu tiên > target)</h2>
            <p>Tìm vị trí chèn sau tất cả phần tử == target.</p>

            <div class="content-code-block">
                <div class="code-block-header">C++</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

int upperBound(vector<int>& arr, int target) {
    int left = 0, right = arr.size();
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] <= target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}

int main() {
    vector<int> arr = {1, 3, 3, 5, 7};
    cout << upperBound(arr, 3) << endl;  // Output: 3 (after last 3)
    return 0;
}
                </code></pre>
            </div>

            <h2>3. Ứng dụng Olympic: Tìm số lượng phần tử nhỏ hơn K</h2>
            <p>Sử dụng lower_bound để đếm số phần tử < K trong mảng sắp xếp.</p>

            <h2>4. Luyện tập</h2>
            <p>Bài tập: "Aggressive Cows" trên SPOJ sử dụng binary search trên khoảng cách.</p>
        `
    },
    {
        id: 'bitmask-dp',
        category: 'nhi-phan',
        title: 'Bitmask DP: Ứng dụng trong Bài toán Tập con Olympic',
        content: `
            <h2>1. Giới thiệu Bitmask DP</h2>
            <p>Bitmask DP sử dụng bit để đại diện trạng thái của tập hợp, thường cho bài toán TSP (Traveling Salesman Problem) hoặc subset sum, với độ phức tạp O(2^n * n).</p>

            <h2>2. Ví dụ: Subset Sum</h2>
            <p>Kiểm tra có tập con nào tổng bằng target không.</p>

            <div class="content-code-block">
                <div class="code-block-header">C++</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

bool subsetSum(vector<int>& arr, int target) {
    int n = arr.size();
    for (int mask = 0; mask < (1 << n); mask++) {
        int sum = 0;
        for (int i = 0; i < n; i++) {
            if (mask & (1 << i)) {
                sum += arr[i];
            }
        }
        if (sum == target) return true;
    }
    return false;
}

int main() {
    vector<int> arr = {3, 34, 4, 12, 5, 2};
    cout << (subsetSum(arr, 9) ? "Yes" : "No") << endl;  // Yes (4+5)
    return 0;
}
                </code></pre>
            </div>

            <h2>3. Tối ưu hóa với DP</h2>
            <p>Sử dụng mảng dp[1<<n] để lưu trạng thái có thể đạt được.</p>

            <div class="content-code-block">
                <div class="code-block-header">C++</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

bool canPartition(vector<int>& nums, int target) {
    int n = nums.size();
    int sum = 0;
    for (int num : nums) sum += num;
    if (sum % 2 != 0) return false;
    target = sum / 2;

    vector<bool> dp(1 << n, false);
    dp[0] = true;
    for (int mask = 0; mask < (1 << n); mask++) {
        if (!dp[mask]) continue;
        int currentSum = 0;
        for (int i = 0; i < n; i++) {
            if ((mask & (1 << i)) == 0) {
                currentSum += nums[i];
                if (currentSum <= target) {
                    dp[mask | (1 << i)] = true;
                }
                currentSum -= nums[i];
            }
        }
    }
    return dp[(1 << n) - 1] && /* check if target reached */;
}

int main() {
    // Implementation for partition equal subset sum
    return 0;
}
                </code></pre>
            </div>

            <h2>4. Ứng dụng Olympic</h2>
            <p>- TSP: Tìm đường đi ngắn nhất thăm tất cả thành phố.<br>
            - Assignment Problem với bitmask.<br>Luyện tập: "TSP" trên Codeforces hoặc UVa.</p>
        `
    },
];

module.exports = binaryTopics;
