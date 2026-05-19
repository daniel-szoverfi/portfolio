#include <iostream>
using namespace std;

int main() {
    // A mátrix mérete, írjuk meg a beolvasást! ...
    int n;

    // Mátrix deklarációja, írd meg a feltöltést és a kiírást is egyben! ...
    cout << "Kiindulasi matrix:" << endl;
    
    // A k oszlop után kerül az új oszlop, írd meg a beolvasást! ...
    cout << "\nMelyik oszlop után szurjuk be az ujat? (0-" << n - 1 << "): ";
    int k;

    // ── Oszlop beszúrása ─────────────────────────────────────




    // ───────────────────────────────────────

    cout << "\nEredmeny (uj oszlop a k = " << k << " utáni oszlop):" << endl;
    

    return 0;
}

// ── Példafutás (n = 5, k = 2, után) ──────────────
//
//  Kiindulasi matrix:
//   1   2   3   4   5
//   6   7   8   9  10
//  11  12  13  14  15
//  16  17  18  19  20
//  21  22  23  24  25
//
//  Melyik oszlop után szurjuk be az ujat? (1-4): 2
//
//  Uj oszlop ertekei:
//    sor 0:  2 +  3 =  5
//    sor 1:  7 +  8 = 15
//    sor 2: 12 + 13 = 25
//    sor 3: 17 + 18 = 35
//    sor 4: 22 + 23 = 45
//
//  Eredmeny (uj oszlop a k = 2 utáni oszlop):
//   1   2   5   3   4   5
//   6   7  15   8   9  10
//  11  12  25  13  14  15
//  16  17  35  18  19  20
//  21  22  45  23  24  25
