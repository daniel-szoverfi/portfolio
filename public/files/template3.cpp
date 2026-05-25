#include <iostream>
#include <fstream>
using namespace std;

int main() {

    // --- VALTOZOK DEKLARALASA ---

    // TODO: Hozz letre egy frekvenciatombot 26 elemmel!
    //       freq[0] az 'a' betut, freq[25] a 'z' betut jeloli.




    // --- FAJL MEGNYITASA ---

    // TODO: Nyisd meg a "szoveg.txt" fajlt olvassara! (ifstream)


    // TODO: Ellenorizd, hogy sikerult-e megnyitni!
    //       Ha nem, ird ki a hibauzenetet es lepj ki! (return 1;)




    // --- KARAKTERENKENTI BEOLVASAS ---

    // TODO: Irj egy ciklust, amely karakterenkent olvassa a fajlt!
    //
    //       Minden karakternel:
    //         1. Ha nagybetu (A-Z): alakitsd kisbetuve (+ 32)
    //         2. Ha kisbetu (a-z): noveld a megfelelo tomb elemet
    //            Hogyan? freq[karakter - 'a']++




    // TODO: Zard be a fajlt! (fajl.close())


    // --- EREDMENYEK KIIRASA ---

    // TODO: Irj egy ciklust 0-tol 25-ig, es ird ki minden betuhoz
    //       az elofordulasok szamat!
    //       A betu kiirasa: (char)('a' + i)
    //       Peldaul: "e: 47 db"


    // --- A HAROM LEGGYAKORIBB BETU ---

    // TODO: Keresd meg a 6 leggyakoribb betut es ird ki a nevuket es az elofordulasok szamat!




    return 0;
}
