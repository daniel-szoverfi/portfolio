#include <iostream>
using namespace std;

int main() {
    const int N = 5;

    // Mátrix deklarációja ...
    
    // A k oszlop után kerül az új oszlop, írd meg a beolvasást! ...
    int k;

    // ── Ide írd a kódod ─────────────────────────────────────




    // ── A kódod vége ─────────────────────────────────────
    cout << "\nEredmeny (uj oszlop a " << k << " utáni oszlop):" << endl;
    for (int i = 0; i < N; i++) {
        for (int oszlop = 0; oszlop < N + 1; oszlop++) {
            cout << m[i][oszlop];
            if (oszlop < N) cout << "\t";
        }
        cout << endl;
    }

    return 0;
}

// ── Példafutás (k = 1, után) ──────────────
//
//  Kiindulasi matrix:
//   1   2   3   4   5
//   6   7   8   9  10
//  11  12  13  14  15
//  16  17  18  19  20
//  21  22  23  24  25
//
//  Melyik oszlop után szurjuk be az ujat? (0-3): 1
//
//  Uj oszlop ertekei:
//    sor 0:  2 +  3 =  5
//    sor 1:  7 +  8 = 15
//    sor 2: 12 + 13 = 25
//    sor 3: 17 + 18 = 35
//    sor 4: 22 + 23 = 45
//
//  Eredmeny (uj oszlop a k = 1 utáni oszlop):
//   1   2   5   3   4   5
//   6   7  15   8   9  10
//  11  12  25  13  14  15
//  16  17  35  18  19  20
//  21  22  45  23  24  25
