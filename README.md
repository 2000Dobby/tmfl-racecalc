# tmfl-racecalc

Lay out your race strategy for TMFL races. 
Go to https://liev.dev/racecalc for a working example of the page <br />
You are free to use or modify any part of this repo excluding cibumArs (src/assets/cibumArs.css) for private or commercial purposes. <br />
cibumArs is all rights reserved and may only be used privately

## Explanation
 - Laps: total laps of the final race
 - Stops: how many stops you want to make during the race
 - Time per pitstop: how long it takes to drive through the pit (without refueling)
 - Refueling rate: how many units get refueled per second (normally 4)
 - Fuel usage per lap: how much fuel is used in one lap (average, measure during training)
 - Tire wear per lap: How much tires get worn down in one lap (average, measure during training)
 
Red stints or stops mean that the current strategy is not possible, increase the number of stops and try again

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
