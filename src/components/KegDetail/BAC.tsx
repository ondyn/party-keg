import React, { useEffect, useState } from 'react';
import { IBeer } from './interface';
import countBac from './countBac';
import TimeSpan from './TimeSpan';

// blood alcohol content
const Bac = (
  {
    weight, beers, beerAlc, isMan,
  }: {
    weight: number, beers: IBeer[], beerAlc: number, isMan: boolean
  },
) => {
  const [totalBac, setBac] = useState(0);
  const [zeroTime, setZeroTime] = useState(0);

  const getBac = () => {
    const { bac, zeroBacTime } = countBac(
      weight, beers, beerAlc, isMan, Date.now(),
    );
    setBac(bac);
    setZeroTime(zeroBacTime);
  };

  useEffect(() => {
    getBac();
    const timer = setInterval(() => {
      getBac();
    }, 1000);
    return (() => clearInterval(timer));
  }, [beers]);
  return (
    <>
      <span>{Math.round(totalBac * 100) / 100}</span>
      <TimeSpan
        startTime={Date.now()}
        endTime={zeroTime}
        prefix="after"
        before={false}
      />
    </>
  );
};

export default Bac;


// 1 ‰ – Hovorná opilost
// Typickým projevem této úrovně je vyšší hovornost. Člověk mívá dobrou náladu,
// avšak do určitých hranic.Již při této hranici, kterou u muže 80 kg způsobuje
// cca čtyři desetistupňová piva, nedoporučujeme psát důležité SMS, e-maily nebo
// sdílet na sociálních sítích.
//
// 1,5 ‰ – Lehká opilost
// Větší hovornost, vtipkování, celková uvolněnost. Sebedůvěra se zvyšuje. Pomalejší reakce.
// Pozor proto na modřiny a odřeniny, které si lidé způsobují akrobatickými kousky nebo jen
// obyčejným tancem na stole.
//
// 2 ‰ – Mírná opilost
// Nedostatek koordinace a ztráta koncentrace. Nálada se může výrazně zlepšit nebo zhoršit.
// Člověk bývá akční nebo naopak unavený, řada lidí usne. V této fázi, kterou způsobí např.
// u ženy 60 kg čtyři skleničky červeného vína, je již motorika těžko neovladatelná
// a myšlenkové pochody jsou jiné než za střízliva.
//
//   Těžká opilost, intoxikace
// 3 ‰ – Těžká opilost
// Neschopnost samostatně chodit, nesrozumitelná řeč, poruchy chování. Významné riziko agrese.
// V tuto chvíli hrozí ztráta kontroly a paměti, a tím může docházet k nebezpečným situacím,
// vandalství, případně jiným přestupkům nebo dokonce trestným činům.
//
// 4 ‰ – Závažné intoxikace
// Závažné riziko bezvědomí. Pomalé a mělké dýchání. Potenciální riziko dýchacích a dalších
// zdravotních problémů.

// hustota alkoholu je totiž 0,789 g/cm3
