import { IBeer } from './interface';

export interface IBac {
  bac: number,
  zeroBacTime: number,
}

const countBac = (
  weight: number | null, beers: IBeer[], beerAlc: number | null, isMan: boolean, time: number,
): IBac => {
  if (!weight || !beerAlc) return { bac: -1, zeroBacTime: -1 };
  if (beers.length > 0 && weight && weight > 0 && beerAlc) {
    const orderedBeers = beers.sort((a, b) => {
      if (a.createTime && b.createTime) {
        if (a.createTime > b.createTime) return 1;
        if (a.createTime < b.createTime) return -1;
        return 0;
      }
      return 1;
    });

    const k: number = isMan ? (0.1 * weight) : (0.085 * weight);
    let zeroTime = -1;

    let lastTime = beers[0].createTime!.toMillis();
    let lastQ = 0;
    orderedBeers.forEach((beer) => {
      // y= - kx + q
      const alcWeight = (beer.volume * 1000 * beerAlc * 0.789) / 100;
      let actualQ = 0;
      if (beer.createTime) {
        const deltaHours = (beer.createTime?.toMillis() - lastTime) / (1000 * 60 * 60);
        actualQ = lastQ - k * deltaHours + alcWeight;
        if (actualQ < 0) {
          actualQ = 0;
          zeroTime = 0;
        } else zeroTime = beer.createTime?.toMillis() + (actualQ / k) * 60 * 60 * 1000;

        lastTime = beer.createTime?.toMillis();
        lastQ = actualQ;
      }
    });

    const alcRest = lastQ - k * ((time - lastTime) / (1000 * 60 * 60));

    const promileRest = isMan ? alcRest / (weight * 0.7) : alcRest / (weight * 0.6);
    return { bac: promileRest, zeroBacTime: zeroTime };
  }
  return { bac: 0, zeroBacTime: 0 };
};
export default countBac;
