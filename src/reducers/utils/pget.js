const initstate = {
  fappno: "",
  fmobileno: "",
  fdegree1: "",
  fdegree2: "",
  fdegree3: "",
  fdegree4: "",
  fdegree5: "",
  fdegree6: "",
  fname: "",
  fphotopath: "",
  fgender: "",
  fdob: "",
  ffatname: " ",
  ffatocc: " ",
  fmotname: "",
  fmotocc: "",
  fnational: "",
  fogirl: "",
  fcategory: "",
  fpmregno: "",
  fincome: "",
  fbpl: "",
  fkarstudy: "",
  faadharno: "",
  fsslcregno: "",
  fpermadd1: "",
  fpermadd2: "",
  fpermadd3: "",
  fpermadd4: "",
  fpermdist: "",
  fpermstate: "",
  fpermpin: "",
  fcurradd1: "",
  fcurradd2: "",
  fcurradd3: "",
  fcurradd4: "",
  fcurrdist: "",
  fcurrstate: "",
  fcurrpin: "",
  femail: "",
  fkashmir: "",
  fhk: "",
  fjk: "",
  frural: "",
  fkannada: "",
  fbcue: "",
  fbcuetype: "",
  fsports: "",
  fculture: "",
  fncc: "",
  fnss: "",
  fdefence: "",
  fhandicap: "",
  fqdegree: "",
  fqutype: "",
  fquniv: "",
  fqyear: "",
  fqmonth: "",
  fqregno: "",
  fqclass: "",
  fqmaxmarks: "",
  fqsecmarks: "",
  fqpercentage: "",
  flang1: "",
  flang1mm: "",
  flang1ms: "",
  flang2: "",
  flang2mm: "",
  flang2ms: "",
  fopt1: "",
  fopt1mm: "",
  fopt1ms: "",
  fopt2: "",
  fopt2mm: "",
  fopt2ms: "",
  fopt3: "",
  fopt3mm: "",
  fopt3ms: "",
  fopt4: "",
  fopt4mm: "",
  fopt4ms: "",
  fpumat: "",
  fpubio: "",
  fpgdegree: "",
  fpgqdegree: "",
  fpgunivtype: "",
  fpgqclass: "",
  fpguniv: "",
  fpgyear: "",
  fpgmonth: "",
  fpgregno: "",
  fpgmaxmarks: "",
  fpgsecmarks: "",
  fothexam: "",
  fsponsor: "",
  fothinfo: "",
  fdocattest: "",
  fappremarks: ""
};

export const pgetEditApp = (state = initstate, action) => {
  switch (action.type) {
    case "GET_PGET_DATA":
      return action.payload.data[0];
    case "CHANGE_PGET_DATA":
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    case "GET_PGET_ACK":
      console.log(action.payload);
    // return action.payload;
    default:
      return state;
  }
};

export const pgetDeg = (state = [], action) => {
  switch (action.type) {
    case "GET_PGET_DEG":
      return action.payload.data;
    default:
      return state;
  }
};
