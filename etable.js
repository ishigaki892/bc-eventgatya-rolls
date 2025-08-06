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
	ur = 9000;
	sr = 6000;
	nr = 1000;
	gt_chara = [
		["5千XP"],
		["スピダ", "ニャンピュ", "1万XP", "3万XP"],
		["ネコボン", "おかめ", "スニャ", "10万XP"],
		["タスマニアオオガニ", "古びたタマゴ:N206", "イワシ", "イカ"]
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
	bc = url.searchParams.get("lr");
	if (bc === "4000") {
		maechara.innerHTML = "LR:タスマニアオオガニ";
	} else if (bc === "4001") {
		maechara.innerHTML = "LR:古びたタマゴ:N206";
	} else if (bc === "4002") {
		maechara.innerHTML = "LR:イワシ";
	} else if (bc === "4003") {
		maechara.innerHTML = "LR:イカ";
	} else if (bc === "3000") {
		maechara.innerHTML = "LR:ネコボン";
	} else if (bc === "3001") {
		maechara.innerHTML = "LR:おかめ";
	} else if (bc === "3002") {
		maechara.innerHTML = "LR:スニャ";
	} else if (bc === "3003") {
		maechara.innerHTML = "LR:10万XP";
	} else if (bc === "2000") {
		maechara.innerHTML = "LR:スピダ";
	} else if (bc === "2001") {
		maechara.innerHTML = "LR:ニャンピュ";
	} else if (bc === "2002") {
		maechara.innerHTML = "LR:1万XP";
	} else if (bc === "2003") {
		maechara.innerHTML = "LR:3万XP";
	} else if (bc === "1000") {
		maechara.innerHTML = "LR:5千XP";
	} else {
		maechara.innerHTML = "LR:設定なし"
	}

	let mae_seed_a = "";
  let characterlist_a = [];
  let kaburihituyousozai_a = [];
	let aread = [];
	let kaburia;
	let namesa = [];
	const seed_a = [];
	let kakuteisa = [];
	for (let i = 0; i <= 99; i++) {
		const xorshift = new Xorshift32(seed);
		const results = [];
		for (let i = 0; i < 3; i++) {
			results.push(xorshift.random());
		}
		const result1 = results[0] % 10000;
		const result2 = results[1];
		const result3 = results[2];
		seed = result2;
		const kaburi_shifut = new Xorshift32(result2);
		let name;
		let kakutei;

		kakutei = gt_chara[3][result2 % gt_chara[3].length];
		name = gt_chara[getValue(result1)][result2 % gt_chara[getValue(result1)].length];
		if (i == 0) {
			if (maechara.textContent === "LR:" + name) {
				const kaburi = gt_chara[1].slice();
				kaburi.splice((result2 % gt_chara[getValue(result1)].length), 1);
				kaburia = kaburi[(kaburi_shifut.random()) % (gt_chara[1].length - 1)];
				if (kaburia === "スピダ") {
					gc = 2000;
				} else if (kaburia === "ニャンピュ") {
					gc = 2001;
				} else if (kaburia === "1万XP") {
					gc = 2002;
				} else if (kaburia === "3万XP") {
					gc = 2003;
				}
			} else {
				kaburia = "";
			};

		} else if (mae_seed_a === name && getValue(result1) == 1) {
			const kaburi = gt_chara[1].slice();
			kaburi.splice((result2 % gt_chara[getValue(result1)].length), 1);
			kaburia = kaburi[(kaburi_shifut.random()) % (gt_chara[1].length - 1)];
			if (kaburia === "スピダ") {
				gc = 2000;
			} else if (kaburia === "ニャンピュ") {
				gc = 2001;
			} else if (kaburia === "1万XP") {
				gc = 2002;
			} else if (kaburia === "3万XP") {
				gc = 2003;
			} else {
        gc = 0;
      }
		} else {
			kaburia = "";
		};
		let baseUrl = window.location.origin + window.location.pathname;
		let k_seedlink;
		let n_seedlink;
		let g_seedlink;
		if (kakutei) {
			if (kakutei === "タスマニアオオガニ") {
				kc = 4000;
			} else if (kakutei === "古びたタマゴ:N206") {
				kc = 4001;
			} else if (kakutei === "イワシ") {
				kc = 4002;
			} else if (kakutei === "イカ") {
				kc = 4003;
			} else {
				kc = 0;
			}
		}
		if (name) {
			if (name === "タスマニアオオガニ") {
				bc = 4000;
			} else if (name === "古びたタマゴ:N206") {
				bc = 4001;
			} else if (name === "イワシ") {
				bc = 4002;
			} else if (name === "イカ") {
				bc = 4003;
			} else if (name === "ネコボン") {
				bc = 3000;
			} else if (name === "おかめ") {
				bc = 3001;
			} else if (name === "スニャ") {
				bc = 3002;
			} else if (name === "10万XP") {
				bc = 3003;
			} else if (name === "スピダ") {
				bc = 2000;
			} else if (name === "ニャンピュ") {
				bc = 2001;
			} else if (name === "1万XP") {
				bc = 2002;
			} else if (name === "3万XP") {
				bc = 2003;
			} else if (name === "5千XP") {
				bc = 1000;
			} else {
				bc = 0;
			}
    }
    if (kaburia) {
			k_seedlink = `<br>B` + (i + 2) +
				`)<a href="${baseUrl}?seed=${result3}&lr=${gc}" style="color:black;">${kaburia}</a>`;
		} else {
			k_seedlink = "";
		}
		if (name && (name.includes("ニア") || name.includes("N206") || name.includes(
				"イワシ") || name.includes("イカ"))) {
			n_seedlink =
				`<a href="${baseUrl}?seed=${result2}&lr=${bc}" style="color:rgb(255,0,0);">${name}</a>`;
		} else if (name) {
			n_seedlink =
				`<a href="${baseUrl}?seed=${result2}&lr=${bc}" style="color:black;">${name}</a>`;
		}
		if (kakutei) {
			g_seedlink =
				`<a href="${baseUrl}?seed=${result2}&lr=${kc}" style="color:black;">${kakutei}</a>`;
		}
		kakuteisa.push(g_seedlink);
    characterlist_a.push(bc,name);
    kaburihituyousozai_a.push(baseUrl,result3,gc,kaburia);
		aread.push(result1);
		namesa.push(n_seedlink + k_seedlink);
		seed_a.push(result2);
		mae_seed_a = name;
	}
	const xorshift = new Xorshift32(url.searchParams.get("seed"));
	seed = xorshift.random();
	let mae_seed_b = "";
  let characterlist_b = [];
  let kaburihituyousozai_b = [];
	let bread = [];
	let namesb = [];
	const seed_b = [];
	let kakuteisb = [];
	for (let i = 0; i <= 99; i++) {
		const xorshift = new Xorshift32(seed);
		const results = [];
		for (let i = 0; i < 3; i++) {
			results.push(xorshift.random());
		}
		const result1 = results[0] % 10000;
		const result2 = results[1];
		const result3 = results[2];
		seed = result2;
		const kaburi_shifut = new Xorshift32(result2);
		let name;
		let kakutei;
		kakutei = gt_chara[3][result2 % gt_chara[3].length];
		name = gt_chara[getValue(result1)][result2 % gt_chara[getValue(result1)].length];
		if (i == "0") {
			if (maechara.textContent === name) {
				const kaburi = gt_chara[1].slice();
				kaburi.splice((result2 % gt_chara[getValue(result1)].length), 1);
				kaburia = kaburi[(kaburi_shifut.random()) % (gt_chara[1].length - 1)];
				if (kaburia === "スピダ") {
					gc = 2000;
				} else if (kaburia === "ニャンピュ") {
					gc = 2001;
				} else if (kaburia === "1万XP") {
					gc = 2002;
				} else if (kaburia === "3万XP") {
					gc = 2003;
				}
			} else {
				kaburia = "";
			};

		}
		if (mae_seed_b === name && getValue(result1) == 1) {
			const kaburi = gt_chara[1].slice();
			kaburi.splice((result2 % gt_chara[getValue(result1)].length), 1);
			kaburia = kaburi[(kaburi_shifut.random()) % (gt_chara[1].length - 1)];
			if (kaburia === "スピダ") {
				gc = 2000;
			} else if (kaburia === "ニャンピュ") {
				gc = 2001;
			} else if (kaburia === "1万XP") {
				gc = 2002;
			} else if (kaburia === "3万XP") {
				gc = 2003;
			} else {
        gc = 0;
      }
		} else {
			kaburia = "";
		};
		let baseUrl = window.location.origin + window.location.pathname;
		let k_seedlink;
		let n_seedlink;
		let g_seedlink;
		if (kakutei) {
			if (kakutei === "タスマニアオオガニ") {
				kc = 4000;
			} else if (kakutei === "古びたタマゴ:N206") {
				kc = 4001;
			} else if (kakutei === "イワシ") {
				kc = 4002;
			} else if (kakutei === "イカ") {
				kc = 4003;
			} else {
				kc = 0;
			}
		}
		if (name) {
			if (name === "タスマニアオオガニ") {
				bc = 4000;
			} else if (name === "古びたタマゴ:N206") {
				bc = 4001;
			} else if (name === "イワシ") {
				bc = 4002;
			} else if (name === "イカ") {
				bc = 4003;
			} else if (name === "ネコボン") {
				bc = 3000;
			} else if (name === "おかめ") {
				bc = 3001;
			} else if (name === "スニャ") {
				bc = 3002;
			} else if (name === "10万XP") {
				bc = 3003;
			} else if (name === "スピダ") {
				bc = 2000;
			} else if (name === "ニャンピュ") {
				bc = 2001;
			} else if (name === "1万XP") {
				bc = 2002;
			} else if (name === "3万XP") {
				bc = 2003;
			} else if (name === "5千XP") {
				bc = 1000;
			} else {
				bc = 0;
			}
		}
		if (kaburia) {
			k_seedlink = `<br>A` + (i + 3) +
				`)<a href="${baseUrl}?seed=${result3}&lr=${gc}" style="color:black;">${kaburia}</a>`;
		} else {
			k_seedlink = "";
		}
		if (name && (name.includes("ニア") || name.includes("N206") || name.includes(
				"イワシ") || name.includes("イカ"))) {
			n_seedlink =
				`<a href="${baseUrl}?seed=${result2}&lr=${bc}" style="color:rgb(255,0,0);">${name}</a>`;
		} else if (name) {
			n_seedlink =
				`<a href="${baseUrl}?seed=${result2}&lr=${bc}" style="color:black;">${name}</a>`;
		}
		if (kakutei) {
			g_seedlink =
				`<a href="${baseUrl}?seed=${result2}&lr=${kc}" style="color:black;">${kakutei}</a>`;
		}
		kakuteisb.push(g_seedlink);
    characterlist_b.push(bc,name);
    kaburihituyousozai_b.push(baseUrl,result3,kaburia);
		bread.push(result1);
		namesb.push(n_seedlink + k_seedlink);
		seed_b.push(result2);
		mae_seed_b = name;
	}
  for (let i = 0; i < namesa.length; i++) {
    if (kaburihituyousozai_b[3 * i + 2] === characterlist_a[2 * i + 5]) {
      result1 = aread[i];
      result2 = seed_a[i];
      result3 = kaburihituyousozai_b[3 * i + 1];
      bc = characterlist_a[2 * i + 4];
      baseUrl = kaburihituyousozai_b[3 * i];
      namea = characterlist_a[2 * i + 5];
      const kaburi_shifut = new Xorshift32(result3);
      kaburibango = gt_chara[1].indexOf(characterlist_a[2 * i + 5])
      const kaburi = gt_chara[1].slice();
			kaburi.splice(kaburibango, 1);
			kaburia = kaburi[(kaburi_shifut.random()) % (gt_chara[1].length - 1)];
				if (kaburia === "スピダ") {
					gc = 2000;
				} else if (kaburia === "ニャンピュ") {
					gc = 2001;
				} else if (kaburia === "1万XP") {
					gc = 2002;
				} else if (kaburia === "3万XP") {
					gc = 2003;
				}
      n_seedlink =
				`<a href="${baseUrl}?seed=${result2}&lr=${bc}" style="color:black;">${namea}</a>`;
      k_seedlink = `<br>RB` + (i + 4) +
				`)<a href="${baseUrl}?seed=${result3}&lr=${gc}" style="color:black;">${kaburia}</a>`;
      namesa.splice(i + 2,1,n_seedlink + k_seedlink);
      console.log(n_seedlink + k_seedlink,i);
			} else {
				kaburia = "";
		  }

    
  }

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
        <td class="G_blocksa">${Ga_blocks[i]}</td>
        <td class="E_blocksb">${Eb_blocks[i]}</td>
        <td class="G_blocksb">${Gb_blocks[i]}</td>
      </tr>`;
	}


});
