const copyButton = document.getElementById("copybutton");
const addButton = document.getElementById("ok_button");
const seedSelect = document.getElementById("seed_select");
const tableBody = document.getElementById("gatya_table");
let bc;
let kc;
let gc;
const url = new URL(window.location.href);

class Xorshift32 {
	constructor(seed) {
		this.seed = seed >>> 0;
	}

	random() {
		this.seed ^= this.seed << 13;
		this.seed ^= this.seed >>> 17;
		this.seed ^= this.seed << 15;
		return this.seed >>> 0;
	}
}
function getTextColor(text) {
  const colorGroups = {
    "rgb(255,0,0)": ["ドル","ー","コンサル","ネコまね"]
  };
  for (const [color, keywords] of Object.entries(colorGroups)) {
    if (keywords.some(k => text.includes(k))) return color;
  }
  return "black";
}

function getIfYAMIME(text) {
  const YAMIMESTYLE = {
    "16px": ["闇猫目"]
  }
  for (const [fonts, keywords] of Object.entries(YAMIMESTYLE)) {
    if (keywords.some(k => text.includes(k))) return fonts;
  }
  return "";
}


addButton.addEventListener("click", function() {

	const inputNumber = seedSelect.value;
	url.searchParams.set("seed", inputNumber);
	location.href = url;
});

document.addEventListener("DOMContentLoaded", function() {
	copyButton.addEventListener('click', function() {
		const textToCopy = seedSelect.value;

		navigator.clipboard.writeText(textToCopy)
			.then(() => {
				console.log('シードがクリップボードにコピーされました');
				alert('コピーしました！');
			})
			.catch(err => {
				console.error('コピーに失敗しました', err);
				alert('コピーに失敗しました。お使いのブラウザが対応していないか、セキュリティ設定をご確認ください。');
			});
	});
	const maechara = document.getElementById("lr");
	let seed = url.searchParams.get("seed");
	let bc = url.searchParams.get("lr");
	if (seed) {
		seedSelect.value = seed;
	} else {
		url.searchParams.set("seed", 1);
		seed = 1;
	}
	let lr, ur, sr, nr, gt_chara;
	lr = 10000;
	ur = 9200;
	sr = 7200;
	nr = 3400;
	gt_chara = [
		["5千XP","2千XP"],
		["スピダ", "ニャンピュ", "1万XP", "2.5万XP"],
		["ネコボン", "おかめ", "スニャ"],
		["にゃんこバーガー", "ネコまねき", "100万ドルのネコ", "ネココンサルタント"]
	];

	function getValue(input_seed) {
		if (input_seed >= lr) {
			return 4;
		} else if (input_seed >= ur) {
			return 3;
		} else if (input_seed >= sr) {
			return 2;
		} else if (input_seed >= nr) {
			return 1;
		} else if (input_seed >= 0) {
			return 0;
		}
	};
function processGacha(seed, rounds, arr, valueFn, nameList, recordList, darkList, labelOffsets, gatya, checkDark = false) {
  let mae_seed = "", kaburi = "";
  const baseUrl = window.location.origin + window.location.pathname;
  for (let i = 0; i <= rounds; i++) {
	const xorshift = new Xorshift32(seed);
	const results = Array.from({ length: 5 }, () => xorshift.random());
	const [r1raw, r2, r3, r4, r5] = results;
	const r1 = r1raw % 10000;
	seed = r2;
	
	const kaburi_shift = new Xorshift32(r2);
	let name;
	name = arr[valueFn(r1)][r2 % arr[valueFn(r1)].length];
	const index1 = arr[valueFn(r1)].indexOf(name);
	const kaburi1 = arr[valueFn(r1)].slice();
	kaburi1.splice(index1,1);
	const index2 = kaburi1.indexOf(name);
	const kaburi2 = kaburi1.slice()
	kaburi2.splice(index2,1);
	const index3 = kaburi2.indexOf(name);
	const kaburi3 = kaburi2.slice()
	kaburi3.splice(index3,1);
	let daburu = "F", tripuru = "F", targetseedNm = 0;
	if (mae_seed === name && (valueFn(r1) == 1 || valueFn(r1) == 0)) {
	  kaburi = kaburi1[kaburi_shift.random() % kaburi1.length];
	  if (kaburi === name) {
		daburu = "T"; 
		kaburi = kaburi2[kaburi_shift.random() % kaburi2.length]; 
		if (kaburi === name) { 
		  daburu = "F"; 
		  tripuru = "T"; 
		  kaburi = kaburi3[kaburi_shift.random() % kaburi3.length];
		}
	  }
	} else { 
	  kaburi = "";
	}
	
	let k_seed_link = "", n_seed_link = "";
	if (labelOffsets.add === 2) {
		if (tripuru === "T" || daburu === "T") {
			targetseedNm = 3;
		} else {
			targetseedNm = 2;
		}
	} else {
		if (tripuru === "T") {
			targetseedNm = 4;
		} else {
			targetseedNm = 3;
		}
	}
	
	if (kaburi) {
	  const color = getTextColor(kaburi);
	  const targetSeed = tripuru === "T" ? r5 : daburu === "T" ? r4 : r3;
	  const label = tripuru === "T" ? labelOffsets.triple : daburu === "T" ? labelOffsets.double : labelOffsets.single;
	  k_seed_link = `<br>${label}${i + targetseedNm})<a href="${baseUrl}?seed=${targetSeed}" style="color:${color};">${kaburi}</a>`;
	}
	if (name) n_seed_link = `<a href="${baseUrl}?seed=${seed}" style="color:${getTextColor(name)}; font-size:${getIfYAMIME(name)}">${name}</a>`;
	if (name === "闇猫目") n_seed_link = `<b><a href="${baseUrl}?seed=${seed}" style="color:${getTextColor(name)}; font-size:${getIfYAMIME(name)}">${name}</a></b>  `;
	if (checkDark) {
	  darkList.push(r1 >= 9900 ? "T" : "F");
	  if (r1 >= 9900 && gatya !== "1") k_seed_link += "<br>(CE→闇猫目)";
	}
	nameList.push(n_seed_link + k_seed_link);
	recordList.push(kaburi ? (tripuru === "T" ? "3" : daburu === "T" ? "2" : "1") : "0",kaburi,name,n_seed_link,k_seed_link);
	mae_seed = name;
  }
}

function getKaK(seed, arr, RLa, RLb, nameList, labelOffsets, valueFn, gatya, rounds) {
  let kaburi;
  const baseUrl = window.location.origin + window.location.pathname;
  for (let i = 0; i < rounds; i++) {
	let k_seed_link = RLa[i * 5 + 4], n_seed_link = RLa[i * 5 + 3];
	const xorshift = new Xorshift32(seed);
	const results = Array.from({ length: 5 }, () => xorshift.random());
	const [r1raw, r2, r3, r4, r5] = results;
	const r1 = r1raw % 10000;
	const kaburi_shift = new Xorshift32(r2);
	let name = RLa[5 * i + 2];
	seed = r2;
	const index1 = arr[valueFn(r1)].indexOf(name);
	const kaburi1 = arr[valueFn(r1)].slice();
	kaburi1.splice(index1,1);
	const index2 = kaburi1.indexOf(name);
	const kaburi2 = kaburi1.slice()
	kaburi2.splice(index2,1);
	const index3 = kaburi2.indexOf(name);
	const kaburi3 = kaburi2.slice()
	kaburi3.splice(index3,1);
	let daburu = "F", tripuru = "F", targetseedNm = 0;
	if (RLb[(i-1) * 5 - 10] === "3" && RLb[(i-1) * 5 - 9] === name) {
	  
	  if (name) {
		kaburi = kaburi1[kaburi_shift.random() % kaburi1.length];
		if (kaburi === name) {
		  daburu = "T"; 
		  kaburi = kaburi2[kaburi_shift.random() % kaburi2.length]; 
		  if (kaburi === name) { 
			daburu = "F"; 
			tripuru = "T"; 
			kaburi = kaburi3[kaburi_shift.random() % kaburi3.length];
		  }
		}
	  } else { 
		kaburi = "";
	  }
	  if (labelOffsets.add === 2) {
		  if (tripuru === "T" || daburu === "T") {
			targetseedNm = 3;
		  } else {
			targetseedNm = 2;
		  }
	  } else {
		  if (tripuru === "T") {
			targetseedNm = 4;
		  } else {
			targetseedNm = 3;
		  }
	  }
	  if (kaburi) {
		const color = getTextColor(kaburi);
		const targetSeed = tripuru === "T" ? r5 : daburu === "T" ? r4 : r3;
		const label = tripuru === "T" ? labelOffsets.triple : daburu === "T" ? labelOffsets.double : labelOffsets.single;
		k_seed_link = `<br>${label}${i + targetseedNm})<a href="${baseUrl}?seed=${targetSeed}" style="color:${color};">${kaburi}</a>`;
	  }
	  if (name) n_seed_link = `<a href="${baseUrl}?seed=${seed}" style="color:${getTextColor(name)}; font-size:${getIfYAMIME(name)}">${name}</a>`;
	  if (name === "闇猫目") n_seed_link = `<b><a href="${baseUrl}?seed=${seed}" style="color:${getTextColor(name)}; font-size:${getIfYAMIME(name)}">${name}</a></b>  `;
	} else if (RLa[(i-1) * 5 - 5] === "2" && RLa[(i-1) * 5 - 4] === name) {
	  
	  if (name) {
		kaburi = kaburi1[kaburi_shift.random() % kaburi1.length];
		if (kaburi === name) {
		  daburu = "T"; 
		  kaburi = kaburi2[kaburi_shift.random() % kaburi2.length]; 
		  if (kaburi === name) { 
			daburu = "F"; 
			tripuru = "T"; 
			kaburi = kaburi3[kaburi_shift.random() % kaburi3.length];
		  }
		}
	  } else { 
		kaburi = "";
	  }
	  if (labelOffsets.add === 2) {
		  if (tripuru === "T" || daburu === "T") {
			targetseedNm = 3;
		  } else {
			targetseedNm = 2;
		  }
	  } else {
		  if (tripuru === "T") {
			targetseedNm = 4;
		  } else {
			targetseedNm = 3;
		  }
	  }
	  if (kaburi) {
		const color = getTextColor(kaburi);
		const targetSeed = tripuru === "T" ? r5 : daburu === "T" ? r4 : r3;
		const label = tripuru === "T" ? labelOffsets.triple : daburu === "T" ? labelOffsets.double : labelOffsets.single;
		k_seed_link = `<br>${label}${i + targetseedNm})<a href="${baseUrl}?seed=${targetSeed}" style="color:${color};">${kaburi}</a>`;
	  }
	  if (name) n_seed_link = `<a href="${baseUrl}?seed=${seed}" style="color:${getTextColor(name)}; font-size:${getIfYAMIME(name)}">${name}</a>`;
	  if (name === "闇猫目") n_seed_link = `<b><a href="${baseUrl}?seed=${seed}" style="color:${getTextColor(name)}; font-size:${getIfYAMIME(name)}">${name}</a></b>  `;
	} else if (RLb[(i-1) * 5 - 5] === "1" && RLb[(i-1) * 5 - 4] === name) {
	  if (name) {
		kaburi = kaburi1[kaburi_shift.random() % kaburi1.length];
		if (kaburi === name) {
		  daburu = "T"; 
		  kaburi = kaburi2[kaburi_shift.random() % kaburi2.length]; 
		  if (kaburi === name) { 
			daburu = "F"; 
			tripuru = "T"; 
			kaburi = kaburi3[kaburi_shift.random() % kaburi3.length];
		  }
		}
	  } else { 
		kaburi = "";
	  }
	  if (labelOffsets.add === 2) {
		  if (tripuru === "T" || daburu === "T") {
			targetseedNm = 3;
		  } else {
			targetseedNm = 2;
		  }
	  } else {
		  if (tripuru === "T") {
			targetseedNm = 4;
		  } else {
			targetseedNm = 3;
		  }
	  }
	  if (kaburi) {
		const color = getTextColor(kaburi);
		const targetSeed = tripuru === "T" ? r5 : daburu === "T" ? r4 : r3;
		const label = tripuru === "T" ? labelOffsets.triple : daburu === "T" ? labelOffsets.double : labelOffsets.single;
		k_seed_link = `<br>${label}${i + targetseedNm})<a href="${baseUrl}?seed=${targetSeed}" style="color:${color};">${kaburi}</a>`;
	  }
	  if (name) n_seed_link = `<a href="${baseUrl}?seed=${seed}" style="color:${getTextColor(name)}; font-size:${getIfYAMIME(name)}">${name}</a>`;
	  if (name === "闇猫目") n_seed_link = `<b><a href="${baseUrl}?seed=${seed}" style="color:${getTextColor(name)}; font-size:${getIfYAMIME(name)}">${name}</a></b>  `;
	}
	nameList.splice(i,1,n_seed_link+k_seed_link);
  }
}

function getKbK(seed, arr, RLa, RLb, nameList, labelOffsets, valueFn, gatya, rounds) {
  let kaburi;
  const baseUrl = window.location.origin + window.location.pathname;
  for (let i = 0; i < rounds; i++) {
	let k_seed_link = RLb[i * 5 + 4], n_seed_link = RLb[i * 5 + 3];
	const xorshift = new Xorshift32(seed);
	const results = Array.from({ length: 5 }, () => xorshift.random());
	const [r1raw, r2, r3, r4, r5] = results;
	const r1 = r1raw % 10000;
	const kaburi_shift = new Xorshift32(r2);
	let name = RLb[5 * i + 2];
	seed = r2;
	const index1 = arr[valueFn(r1)].indexOf(name);
	const kaburi1 = arr[valueFn(r1)].slice();
	kaburi1.splice(index1,1);
	const index2 = kaburi1.indexOf(name);
	const kaburi2 = kaburi1.slice()
	kaburi2.splice(index2,1);
	const index3 = kaburi2.indexOf(name);
	const kaburi3 = kaburi2.slice()
	kaburi3.splice(index3,1);
	let daburu = "F", tripuru = "F", targetseedNm = 0;
	if (RLa[(i) * 5 - 10] === "3" && RLa[(i) * 5 - 9] === name) {
	  
	  if (name) {
		kaburi = kaburi1[kaburi_shift.random() % kaburi1.length];
		if (kaburi === name) {
		  daburu = "T"; 
		  kaburi = kaburi2[kaburi_shift.random() % kaburi2.length]; 
		  if (kaburi === name) { 
			daburu = "F"; 
			tripuru = "T"; 
			kaburi = kaburi3[kaburi_shift.random() % kaburi3.length];
		  }
		}
	  } else { 
		kaburi = "";
	  }
	  if (labelOffsets.add === 2) {
		  if (tripuru === "T" || daburu === "T") {
			targetseedNm = 3;
		  } else {
			targetseedNm = 2;
		  }
	  } else {
		  if (tripuru === "T") {
			targetseedNm = 4;
		  } else {
			targetseedNm = 3;
		  }
	  }
	  if (kaburi) {
		const color = getTextColor(kaburi);
		const targetSeed = tripuru === "T" ? r5 : daburu === "T" ? r4 : r3;
		const label = tripuru === "T" ? labelOffsets.triple : daburu === "T" ? labelOffsets.double : labelOffsets.single;
		k_seed_link = `<br>${label}${i + targetseedNm})<a href="${baseUrl}?seed=${targetSeed}" style="color:${color};">${kaburi}</a>`;
	  }
	  if (name) n_seed_link = `<a href="${baseUrl}?seed=${seed}" style="color:${getTextColor(name)}; font-size:${getIfYAMIME(name)}">${name}</a>`;
	  if (name === "闇猫目") n_seed_link = `<b><a href="${baseUrl}?seed=${seed}" style="color:${getTextColor(name)}; font-size:${getIfYAMIME(name)}">${name}</a></b>  `;
	} else if (RLb[(i) * 5 - 5] === "2" && RLb[(i) * 5 - 4] === name) {
	  
	  if (name) {
		kaburi = kaburi1[kaburi_shift.random() % kaburi1.length];
		if (kaburi === name) {
		  daburu = "T"; 
		  kaburi = kaburi2[kaburi_shift.random() % kaburi2.length]; 
		  if (kaburi === name) { 
			daburu = "F"; 
			tripuru = "T"; 
			kaburi = kaburi3[kaburi_shift.random() % kaburi3.length];
		  }
		}
	  } else { 
		kaburi = "";
	  }
	  if (labelOffsets.add === 2) {
		  if (tripuru === "T" || daburu === "T") {
			targetseedNm = 3;
		  } else {
			targetseedNm = 2;
		  }
	  } else {
		  if (tripuru === "T") {
			targetseedNm = 4;
		  } else {
			targetseedNm = 3;
		  }
	  }
	  if (kaburi) {
		const color = getTextColor(kaburi);
		const targetSeed = tripuru === "T" ? r5 : daburu === "T" ? r4 : r3;
		const label = tripuru === "T" ? labelOffsets.triple : daburu === "T" ? labelOffsets.double : labelOffsets.single;
		k_seed_link = `<br>${label}${i + targetseedNm})<a href="${baseUrl}?seed=${targetSeed}" style="color:${color};">${kaburi}</a>`;
	  }
	  if (name) n_seed_link = `<a href="${baseUrl}?seed=${seed}" style="color:${getTextColor(name)}; font-size:${getIfYAMIME(name)}">${name}</a>`;
	  if (name === "闇猫目") n_seed_link = `<b><a href="${baseUrl}?seed=${seed}" style="color:${getTextColor(name)}; font-size:${getIfYAMIME(name)}">${name}</a></b>  `;
	} else if (RLa[(i) * 5 - 5] === "1" && RLa[(i) * 5 - 4] === name) {
	  
	  if (name) {
		kaburi = kaburi1[kaburi_shift.random() % kaburi1.length];
		if (kaburi === name) {
		  daburu = "T"; 
		  kaburi = kaburi2[kaburi_shift.random() % kaburi2.length]; 
		  if (kaburi === name) { 
			daburu = "F"; 
			tripuru = "T"; 
			kaburi = kaburi3[kaburi_shift.random() % kaburi3.length];
		  }
		}
	  } else { 
		kaburi = "";
	  }
	  if (labelOffsets.add === 2) {
		  if (tripuru === "T" || daburu === "T") {
			targetseedNm = 3;
		  } else {
			targetseedNm = 2;
		  }
	  } else {
		  if (tripuru === "T") {
			targetseedNm = 4;
		  } else {
			targetseedNm = 3;
		  }
	  }
	  if (kaburi) {
		const color = getTextColor(kaburi);
		const targetSeed = tripuru === "T" ? r5 : daburu === "T" ? r4 : r3;
		const label = tripuru === "T" ? labelOffsets.triple : daburu === "T" ? labelOffsets.double : labelOffsets.single;
		k_seed_link = `<br>${label}${i + targetseedNm})<a href="${baseUrl}?seed=${targetSeed}" style="color:${color};">${kaburi}</a>`;
	  }
	  if (name) n_seed_link = `<a href="${baseUrl}?seed=${seed}" style="color:${getTextColor(name)}; font-size:${getIfYAMIME(name)}">${name}</a>`;
	  if (name === "闇猫目") n_seed_link = `<b><a href="${baseUrl}?seed=${seed}" style="color:${getTextColor(name)}; font-size:${getIfYAMIME(name)}">${name}</a></b>  `;
	}
	nameList.splice(i,1,n_seed_link+k_seed_link);
  }
}
let namesa = [], nkb = [], nka = [], namesb = [], kakuteisa = [""], kakuteisb = [""];
processGacha(seed, 99, gt_chara, getValue, namesa, nka, [], { single: "B", double: "A", triple: "B", add: 2 }, "");
processGacha(new Xorshift32(seed).random(), 99, gt_chara, getValue, namesb, nkb, [], { single: "A", double: "B", triple: "A", add: 3 }, "");
getKaK(seed, gt_chara, nka, nkb, namesa, { single: "RB", double: "RA", triple: "RB", add: 2 }, getValue, "", 99);
getKbK(new Xorshift32(seed).random(), gt_chara, nka, nkb, namesb, { single: "RA", double: "RB", triple: "RA", add: 3 }, getValue, "", 99);
	const number_blocks = Array.from({
		length: namesa.length
	}, (_, i) => i + 1);
	const Ea_blocks = [...namesa];
	const Eb_blocks = [...namesb];
	const Ga_blocks = [...kakuteisa];
	const Gb_blocks = [...kakuteisb];
	for (let i = 0; i < namesa.length; i++) {
		tableBody.innerHTML +=
			`
      <tr>
        <td class="number_blocks">${number_blocks[i]}</td>
        <td class="E_blocksa">${Ea_blocks[i]}</td>
        <td class="G_blocksa">${Ga_blocks}</td>
        <td class="E_blocksb">${Eb_blocks[i]}</td>
        <td class="G_blocksb">${Gb_blocks}</td>
      </tr>`;
	}


});
