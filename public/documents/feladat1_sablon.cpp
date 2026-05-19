#include <iostream>
using namespace std;

int main() {
    // A mátrix mérete, írjuk meg a beolvasást! ...
    int n;

    // Mátrix deklarációja, írd meg a feltöltést és a kiírást is egyben! ...
    cout << "Kiindulasi matrix:" << endl;

    // Törlendő sor bekérése, írd meg a beolvasást! ...
    cout << "\nMelyik sort torolod? (0-" << n - 1 << "): ";
    int k;

    // ── Sor törlése ─────────────────────────────────────




    // ───────────────────────────────────────

    cout << "\nEredmeny (A " << k << ". sor torlese utan):" << endl;


    return 0;
}

// ── Példafutás (k = 3) ────────────────────────────────────────
//
//  Kiindulasi matrix:
//   1   2   3   4   5
//   6   7   8   9  10
//  11  12  13  14  15   <- ez törlodik
//  16  17  18  19  20
//  21  22  23  24  25
//
//  Melyik sort torolod? (0-4): 3
//
//  Eredmeny (A 3. sor torlese utan):
//   1   2   3   4   5
//   6   7   8   9  10
//  16  17  18  19  20
//  21  22  23  24  25
//   0   0   0   0   0
