const PAGA_COOLDOWN = 1000*60*60*24
const ZEIN_ZI_PRODUCTION = 0.25
const ZEIN_ZI_PRODUCTION_COOLDOWN = 1000*60*60*2

enum KouGwetStatusEnum {
  WET = 0,
  DRY = 1,
}

type KouGwetStatus = KouGwetStatusEnum.WET | KouGwetStatusEnum.DRY

class LangJiao {
  owner: string
  size: number
  zeinZi = 0
  kouGwet: KouGwetStatus = KouGwetStatusEnum.DRY
  lastPaga = 0

  constructor({size, owner}: {
    size: number
    owner: string
  }) {
    this.size = size
    if (size <= 3) {
      this.owner = 'appleMan'
      return
    }
    this.owner = owner
  }

  produceZeinZi() {
    this.zeinZi += ZEIN_ZI_PRODUCTION
  }

  private siaZein() {
    this.zeinZi = 0
  }

  paGa() {
    if (Date.now() - this.lastPaga <= PAGA_COOLDOWN) {  
      console.warn('Pa ga is in cooldown.')
      return
    }
    this.lastPaga = Date.now()
    this.siaZein()
    console.log(`${this.owner} sucessfully siaed zein! 🚀`)
  }

  ruiZein() {
    this.siaZein()
    this.kouGwet = KouGwetStatusEnum.WET
    console.log(`${this.owner} ruied zein, kou gwet got wet! 😱`)

    setTimeout(() => {
        this.kouGwet = KouGwetStatusEnum.DRY
        console.log(`${this.owner} cleaned kou gwet. 😋`)
    }, 1000*60*10)
  }

  dreamRuiZein() {
    this.produceZeinZi()
    console.log(`${this.owner} dreamed rui zein. 😰`)
  }
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

const main = async() => {
    const crkLangJiao = new LangJiao({size: 12, owner: 'crk'})
    let lastZeinZiProduction = 0

    while (crkLangJiao) {
        if (Date.now() - lastZeinZiProduction <= ZEIN_ZI_PRODUCTION_COOLDOWN) continue
        lastZeinZiProduction = Date.now()
        switch (crkLangJiao.zeinZi) {
            case 0.25:
                crkLangJiao.paGa()
                break
            case 0.5:
                crkLangJiao.dreamRuiZein()
                break
            case 1:
                crkLangJiao.ruiZein()
                break
        }
        crkLangJiao.produceZeinZi()
        await sleep(0)
        continue
    }
}

main()
