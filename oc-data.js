// ===== そぼろ忍 OCまとめ: データファイル =====
// キャラクターの追加・編集は、このファイルだけでOKです。
// oc.html は、ページを開いたときにこのデータから
//   ・世界観ボタン ・所属ボタン ・キャラクターカード ・キャスト一覧 ・マスコットのSD
// を自動で作ります(oc.html 側を直接編集する必要はありません)。
//
// ▼キャラクターを追加するとき▼
//   下の characters の中の { ... } を1ブロックコピーして、中身を書き換えてください。
//
//   id ............ 半角英数のユニークな値(URLの # にも使われます: oc.html#momochan)
//   world ......... 所属する世界観の id(下の worlds のどれか)
//   affiliation ... 所属の id(下の affiliations のどれか)。無ければ省略(所属欄が出ません)
//   thumb ......... キャスト一覧に出す顔アイコンの画像パス。省略すると点線のプレースホルダー
//                   (全身絵を縮小すると顔が判別できないため、自動取得はしません)
//   utau .......... UTAUの配布ページURL。ある子だけ書けば、カード右上に音符バッジが出ます
//   name .......... 名前。読み仮名は {忍|にん} のように書きます
//   trueName ...... 真名(タップで開示)。無ければ省略。「本名」などにしたいときは trueNameLabel: '本名' も書く
//   forms ......... 立ち絵。human(変化)/ nonhuman(通常)それぞれに costumes(衣装違い)を並べます。
//                   衣装が1着だけなら選択ボタンは出ません。src が空('')なら「準備中」表示。
//                   画像ごとにキャンバス内の余白がバラバラなときは、costume に scale: 1.3 のような
//                   倍率を足すとその画像だけ拡大表示できます(省略時は1)。
//   facts ......... [項目名, 内容] の並び。所属は affiliation から自動で先頭に入ります
//   likes / dislikes / hobbies / skills
//                  好き / 嫌い / 趣味 / 特技。該当が無いときは [] にすると「特になし」になります
//   desc .......... 紹介文。1行が1要素で、'' を入れると空行になります
//   voices ........ ボイスサンプル。[{ src: '音声パス' }]。2個以上のときは label: '通常' なども付けます。
//                   src が空('')だと再生ボタンは無効化されます。省略すると無効なボタンが1個出ます。
//                   [] にするとボイス欄ごと無くなります
//   sd ............ 右下のマスコットに出るSDイラストの画像パス(複数書くとランダム。省略可)
//
// ▼世界観・所属を追加するとき▼
//   worlds / affiliations に足すだけでボタンが増えます。所属は icon(画像パス)を省略できます。
//   (所属フィルターのボタンが出るのは worlds の先頭=とどのつまり(world-a)のときだけです)
//
// ▼書き間違いがあったとき▼
//   書き間違い(項目名のタイプミス、存在しない世界観・所属、id の重複など)があると、
//   OCページの上部に注意書きが出て、ブラウザのコンソールに詳しい内容が出ます。
//   間違えたキャラだけが表示されなくなり、他のキャラは表示されます。
//   (ファイル自体の書き方が壊れているとき(カンマ抜けなど)は、コンソールにその場所が出ます)
//
// 文字の中に ' を入れるときは \' と書くか、"..." で囲んでください。
window.OC_DATA = {
  worlds: [
    { id: 'world-a', label: 'とどのつまり' },
    { id: 'world-b', label: '？？？' },
  ],

  affiliations: {
    iga: { label: '伊賀', icon: 'img/oc/affil/iga.webp' },
    kouga: { label: '甲賀', icon: 'img/oc/affil/kouga.webp' },
    gov: { label: '政府', icon: 'img/oc/affil/gov.webp' },
    none: { label: '無所属' },
  },

  characters: [
    // そぼろ忍
    {
      id: 'soboronin',
      world: 'world-a',
      affiliation: 'iga',
      thumb: 'img/oc/soboronin/icon_soboronin.webp',
      utau: 'https://bowlroll.net/user/870791/files?sort=title&order=up&date=none&auth=none',
      name: 'そぼろ{忍|にん}',
      trueName: '{百|モモ}',
      forms: {
        human: {
          label: '変化',
          costumes: [
            { src: 'img/oc/soboronin/soboronin_h_01.webp', label: 'デフォルト' },
            { src: 'img/oc/soboronin/soboronin_h_02.webp', label: '寝巻' },
            { src: 'img/oc/soboronin/soboronin_h_03.webp', label: 'チャイナ' },
            { src: 'img/oc/soboronin/soboronin_h_04.webp', label: 'サイバーパンク' },
            { src: 'img/oc/soboronin/soboronin_h_05.webp', label: '学生' },
            { src: 'img/oc/soboronin/soboronin_h_06.webp', label: '一目連' },
            { src: 'img/oc/soboronin/soboronin_h_07.webp', label: 'ヒーロー' },
            { src: 'img/oc/soboronin/soboronin_h_08.webp', label: '私服？' },
            { src: 'img/oc/soboronin/soboronin_h_09.webp', label: 'アイドル私服' },
          ],
        },
        nonhuman: {
          label: '通常',
          costumes: [
            { src: 'img/oc/soboronin/soboronin_n_01.webp', label: 'デフォルト' },
          ],
        },
      },
      facts: [
        ['性別', '可変'],
        ['身長', '通常130cm、変化122cm(尻尾を除く)'],
        ['一人称', '俺'],
        ['二人称', 'お前、呼び捨て'],
      ],
      likes: ['肉', '辛いもの', 'エナジードリンク'],
      dislikes: ['甲賀', 'おぼろ忍', '野菜', 'ホラー', '面倒くさいこと'],
      hobbies: ['PCゲーム', '賭け事(花札)'],
      skills: ['火系の忍術', '棒術'],
      desc: [
        '伊賀出身の抜け忍で、ドラゴンの純血。',
        '甲賀、とりわけおぼろ忍を強く嫌っている。',
        '嘘つきで他人の不幸を面白がる一方、感情は顔に出やすい。',
        '幼少期、一族の教えで儀式的に羽を捥がれており、今はただ傷が残るだけである。',
        '信仰心が高くない仏教徒。',
        '',
        'とはいえ、もう全部滅茶苦茶になっている。',
      ],
      voices: [
        { src: 'voice/soboronin01.mp3', label: '通常' },
        { src: 'voice/soboronin02.mp3', label: '強' },
        { src: 'voice/soboronin03.mp3', label: '楽' },
      ],
      sd: ['img/oc/soboronin/soboronin_sd_01.webp'],
    },

    // 百ちゃん
    {
      id: 'momochan',
      world: 'world-a',
      affiliation: 'iga',
      thumb: 'img/oc/momochan/icon_momochan.webp',
      utau: 'https://bowlroll.net/file/325820',
      name: '{百|もも}ちゃん',
      trueName: '{一花|イチカ}',
      forms: {
        human: {
          label: '変化',
          costumes: [
            { src: 'img/oc/momochan/momochan_h_01.webp', label: 'デフォルト' },
          ],
        },
        nonhuman: {
          label: '通常',
          costumes: [
            { src: 'img/oc/momochan/momochan_n_01.webp', label: 'デフォルト' },
          ],
        },
      },
      facts: [
        ['性別', '可変'],
        ['身長', '通常130cm、変化122cm(尻尾を除く)'],
        ['一人称', '私'],
        ['二人称', '表: あなた、〇〇君　裏: あんた、呼び捨て'],
      ],
      likes: ['お金', '(桜)'],
      dislikes: ['お金に関係しない無駄なこと'],
      hobbies: ['ショッピング'],
      skills: ['スリ'],
      desc: [
        '伊賀出身の抜け忍で、ドラゴンの純血。',
        '甲賀のことは「気が合わなさそう」という点であまり好きではない。',
        '何よりもお金が大好きで、お金になるなら大抵のことはする。猫被りだけどワガママ。',
        '幼少期、一族の教えで儀式的に羽を捥がれており、今はただ傷が残るだけである。',
        '百くんの双子の姉。',
        '',
        '「金。出して。早く。」',
      ],
      voices: [
        { src: 'voice/momochan01.mp3', label: '通常' },
      ],
    },

    // 百くん
    {
      id: 'momokun',
      world: 'world-a',
      affiliation: 'iga',
      thumb: 'img/oc/momokun/icon_momokun.webp',
      name: '{百|もも}くん',
      trueName: '{伍郎|ゴロウ}',
      forms: {
        human: {
          label: '変化',
          costumes: [
            { src: 'img/oc/momokun/momokun_h_01.webp', label: 'デフォルト' },
          ],
        },
        nonhuman: {
          label: '通常',
          costumes: [
            { src: '', label: 'デフォルト' },
          ],
        },
      },
      facts: [
        ['性別', '可変'],
        ['身長', '通常130cm、変化122cm(尻尾を除く)'],
        ['一人称', 'オレ'],
        ['二人称', '君、〇〇君、呼び捨て'],
      ],
      likes: ['カッコいいもの', 'コーラ'],
      dislikes: ['ダサいもの', '時計の針の音', 'コーヒー'],
      hobbies: ['少年向けアニメ鑑賞'],
      skills: ['反射神経'],
      desc: [
        '伊賀出身の抜け忍で、ドラゴンの純血。',
        '甲賀のことはあまり興味がない。',
        '自分のことを強くてカッコいいと思っているが、実際はかなりのポンコツ。',
        '褒められることや目立つことが大好きで、チョロい。',
        '幼少期、一族の教えで儀式的に羽を捥がれており、今はただ傷が残るだけである。',
        '百ちゃんの双子の弟。',
        '',
        '無敵。',
        '……少なくとも、本人の中では。',
      ],
      voices: [
        { src: '' },
      ],
    },

    // とろろ忍
    {
      id: 'tororonin',
      world: 'world-a',
      affiliation: 'iga',
      thumb: 'img/oc/tororonin/icon_tororonin.webp',
      name: 'とろろ{忍|にん}',
      trueName: '{沓|ナツメ}',
      forms: {
        human: {
          label: '変化',
          costumes: [
            { src: 'img/oc/tororonin/tororonin_h_01.webp', label: 'デフォルト' },
          ],
        },
        nonhuman: {
          label: '通常',
          costumes: [
            { src: '', label: 'デフォルト' },
          ],
        },
      },
      facts: [
        ['性別', '可変'],
        ['身長', '通常130cm、変化122cm(尻尾を除く)'],
        ['一人称', 'ぼく'],
        ['二人称', 'あなた、〇〇くん、〇〇さん'],
      ],
      likes: ['いちご大福', '平和', '動物', '自然'],
      dislikes: ['うるさいもの', '危ないこと', '怖いもの'],
      hobbies: ['小型彫刻', '植物栽培'],
      skills: ['隠密系の忍術'],
      desc: [
        '伊賀出身の抜け忍で、ドラゴンの純血。アルビノ。',
        '甲賀のことはよくわからない。',
        '忍者でありながら本人は忍者をやりたがっておらず、戦いも苦手なドジっ子。',
        '泣き虫かつ臆病で、隠れることだけは得意。',
        '里を離れて教会(たぶん、跡地)で暮らしながら、平穏な毎日を望んでいる。',
        '幼少期、一族の教えで儀式的に羽を捥がれており、今はただ傷が残るだけである。',
        '動物に好かれやすい。',
        '',
        '植物は怒らない。',
        '動物も、だいたい怒らない。',
      ],
      voices: [
        { src: '' },
      ],
    },

    // ロコモコ忍
    {
      id: 'locomoconin',
      world: 'world-a',
      affiliation: 'none',
      thumb: 'img/oc/locomoconin/icon_locomoconin.webp',
      utau: 'https://bowlroll.net/file/333343',
      name: 'ロコモコ{忍|にん}',
      trueName: '{Solomon Corley|ソロモン・コーリー}',
      trueNameLabel: '本名',
      forms: {
        human: {
          label: '変化',
          costumes: [
            { src: 'img/oc/locomoconin/locomoconin_h_01.webp', label: 'デフォルト' },
          ],
        },
        nonhuman: {
          label: '通常',
          costumes: [
            { src: 'img/oc/locomoconin/locomoconin_n_01.webp', label: 'デフォルト' },
          ],
        },
      },
      facts: [
        ['性別', '可変'],
        ['身長', '通常130cm、変化122cm(尻尾を除く)'],
        ['一人称', 'オレ'],
        ['二人称', 'オマエ、呼び捨て'],
      ],
      likes: ['みたらし団子', '忍者っぽいもの'],
      dislikes: ['ルール・規律', '説教'],
      hobbies: ['漢字Tシャツ漁り', 'ストリートアート'],
      skills: ['スケボー'],
      desc: [
        '海外出身の一般ドラゴン。',
        '忍者に憧れる顔出し配信者で、元は「100」というハンドルネームで活動していた。',
        'リスナーからロコモコ忍と呼ばれすぎるので、最近は自分でロコモコ忍と名乗っている。',
        '忍術は独学だけど勉強は苦手で、変化以外は真似事レベルでしかない。',
        'カッコいい漢字だったので、尻尾に「肘」の刺青を入れた。',
        'カタコトで喋る。',
        '',
        '日本語練習中！　がんばれ！',
      ],
      voices: [
        { src: 'voice/locomoconin01.mp3', label: '通常(楽)' },
      ],
    },

    // おぼろ忍
    {
      id: 'oboronin',
      world: 'world-a',
      affiliation: 'kouga',
      thumb: 'img/oc/oboronin/icon_oboronin.webp',
      name: 'おぼろ{忍|にん}',
      trueName: '{煌|コウ}',
      forms: {
        human: {
          label: '変化',
          costumes: [
            { src: 'img/oc/oboronin/oboronin_h_01.webp', label: 'デフォルト' },
          ],
        },
        nonhuman: {
          label: '通常',
          costumes: [
            { src: '', label: 'デフォルト' },
          ],
        },
      },
      facts: [
        ['性別', '可変'],
        ['身長', '通常130cm、変化122cm(尻尾を除く)'],
        ['一人称', '(私)'],
        ['二人称', '(お前、呼び捨て)'],
      ],
      likes: ['魚(特に目玉)', '日本酒', '食べられる物は何でも'],
      dislikes: [],
      hobbies: ['興味の向くままにフラフラする'],
      skills: ['水系の忍術'],
      desc: [
        '甲賀忍者で、ドラゴンと龍の混血。',
        '正直者だが、表情がほとんど変わらないため、何を考えているのかわからない。',
        '賢く、強い。簡単になんでもこなせる。ただ興味がないだけ。',
        '喉の辺りに逆鱗が1枚あり、触られると暴走する。ピアスがある限り無効化される。',
        'いつからか言葉を発さなくなった。',
        '飛行が可能。',
        'もろこ忍の弟。',
        '',
        'ただ、そこにいるのかもしれないし……あ、いない。',
      ],
      voices: [
        { src: '' },
      ],
    },

    // もろこ忍
    {
      id: 'morokonin',
      world: 'world-a',
      affiliation: 'kouga',
      thumb: 'img/oc/morokonin/icon_morokonin.webp',
      name: 'もろこ{忍|にん}',
      trueName: '{煌|コウ}',
      forms: {
        human: {
          label: '変化',
          costumes: [
            { src: 'img/oc/morokonin/morokonin_h_01.webp', label: 'デフォルト' },
          ],
        },
        nonhuman: {
          label: '通常',
          costumes: [
            { src: '', label: 'デフォルト' },
          ],
        },
      },
      facts: [
        ['性別', '可変'],
        ['身長', '通常150cm、変化140cm(尻尾を除く)'],
        ['一人称', '僕'],
        ['二人称', 'アンタ、〇〇君'],
      ],
      likes: ['高い所', '緑茶'],
      dislikes: ['脳筋', '無能'],
      hobbies: ['ポーカー'],
      skills: ['吹き矢', 'イカサマ'],
      desc: [
        '甲賀忍者で、ドラゴンと龍の混血。',
        '甲賀の中でも高い実力を持つが、家族の中では力が弱く、産まれた時点で既に立場が悪かった。',
        '家族から名前を呼ばれることが無くなったため、真名を弟に取られている。',
        '認められないことを気にしながらも、自分の立場を良くするために弟を利用している。',
        '力を抑えるためのピアスを作って、弟に着けてあげている。',
        '喉の辺りに逆鱗が1枚あり、触られると激昂する。完全に理性を失うことはない。',
        '飛行が可能。近江弁、関西弁気味。',
        'おぼろ忍の兄。',
        '',
        '「もっと賢う生きなあかんよなぁ？　そうやろ？」',
      ],
      voices: [
        { src: '' },
      ],
    },

    // ほどろ忍
    {
      id: 'hodoronin',
      world: 'world-a',
      affiliation: 'kouga',
      thumb: 'img/oc/hodoronin/icon_hodoronin.webp',
      name: 'ほどろ{忍|にん}',
      trueName: '{灸|ヤイト}',
      forms: {
        human: {
          label: '変化',
          costumes: [
            { src: 'img/oc/hodoronin/hodoronin_h_01.webp', label: 'デフォルト' },
          ],
        },
        nonhuman: {
          label: '通常',
          costumes: [
            { src: '', label: 'デフォルト' },
          ],
        },
      },
      facts: [
        ['性別', '可変'],
        ['身長', '通常133cm、変化123cm(尻尾を除く)'],
        ['一人称', '私'],
        ['二人称', 'お前、呼び捨て'],
      ],
      likes: ['紅茶', 'トウモロコシ'],
      dislikes: ['虫', '下品なこと', '鶏扱いされること'],
      hobbies: ['日記', '編み物'],
      skills: ['火系の忍術'],
      desc: [
        '甲賀忍者で、朱雀の純血。',
        'リーダー面したいわけではないが、このチームをまとめたいとは思っている。',
        '火を操る力を持つ。口から火を出す奴が居るなんて信じられない。野蛮だ。',
        '甘え下手で大真面目。',
        '性別が可変の為、場合によってはうっかり卵を産むときがある。',
        '翼を使用しての飛行が可能。',
        '',
        '誰かがまとめなければならない。',
        'そう思っているのに、誰もまとまってくれない。',
      ],
      voices: [
        { src: '' },
      ],
    },

    // おとも忍
    {
      id: 'otomonin',
      world: 'world-a',
      affiliation: 'kouga',
      thumb: 'img/oc/otomonin/icon_otomonin.webp',
      name: 'おとも{忍|にん}',
      trueName: '{陸|リク}',
      forms: {
        human: {
          label: '変化',
          costumes: [
            { src: 'img/oc/otomonin/otomonin_h_01.webp', label: 'デフォルト' },
          ],
        },
        nonhuman: {
          label: '通常',
          costumes: [
            { src: '', label: 'デフォルト' },
          ],
        },
      },
      facts: [
        ['性別', '可変'],
        ['身長', '通常135cm、変化125cm(尻尾を除く)'],
        ['一人称', 'おれ'],
        ['二人称', 'あだ名、おまえ'],
      ],
      likes: ['お日様', '気持ちのいい場所', '撫でられること'],
      dislikes: ['水'],
      hobbies: ['日向ぼっこ'],
      skills: ['体術', '雷系の忍術'],
      desc: [
        '甲賀忍者で、白虎の純血。',
        'マイペースでとにかく自由奔放。「ヤダ！」「いいよ～」等ははっきりしている。',
        '人懐っこく甘え上手で、任務や稽古に付き合う素直さも持つ。',
        '雷系の忍術を得意とし、発動後は静電気でとんでもないことになる。',
        '勝手に他人をあだ名呼びする。',
        '',
        'さっきまでそこで寝てただろ？　ふかふかすぎる。',
      ],
      voices: [
        { src: '' },
      ],
    },

    // ももよ忍
    {
      id: 'momoyonin',
      world: 'world-a',
      affiliation: 'kouga',
      thumb: 'img/oc/momoyonin/icon_momoyonin.webp',
      name: 'ももよ{忍|にん}',
      trueName: '{岳|ガク}',
      forms: {
        human: {
          label: '変化',
          costumes: [
            { src: 'img/oc/momoyonin/momoyonin_h_01.webp', label: 'デフォルト' },
          ],
        },
        nonhuman: {
          label: '通常',
          costumes: [
            { src: '', label: 'デフォルト' },
          ],
        },
      },
      facts: [
        ['性別', '可変'],
        ['身長', '通常138cm、変化125cm(尻尾を除く)'],
        ['一人称', '僕'],
        ['二人称', 'あなた、呼び捨て'],
      ],
      likes: ['卵料理', '珍しいもの'],
      dislikes: ['寒さ'],
      hobbies: ['研究', '本を読む'],
      skills: ['土・毒系の忍術'],
      desc: [
        '甲賀忍者で、玄武の純血。',
        '温厚な物腰とは裏腹に、行動はきびきびとしている。',
        '感情に流されることは少なく、物事を論理的に捉えるタイプ。',
        'だが、興味を持ったものには素直に従う、掴みどころがない。',
        '尻尾の蛇とは脳が別々に存在しており、仲が良い。',
        '',
        '感情よりも、理屈。',
        '理屈よりも、面白いほう。',
      ],
      voices: [
        { src: '' },
      ],
    },

    // 天宮
    {
      id: 'amatsunomiya',
      world: 'world-a',
      affiliation: 'gov',
      thumb: 'img/oc/amatsunomiya/icon_amatsunomiya.webp',
      name: '{天宮|あまつのみや}',
      forms: {
        human: {
          label: '変化',
          costumes: [
            { src: 'img/oc/amatsunomiya/amatsunomiya_h_01.webp', label: 'デフォルト' },
          ],
        },
        nonhuman: {
          label: '通常',
          costumes: [
            { src: '', label: 'デフォルト' },
          ],
        },
      },
      facts: [
        ['性別', '可変'],
        ['身長', '通常5cm、変化100cm(尻尾を除く)'],
        ['一人称', '儂'],
        ['二人称', '御主'],
      ],
      likes: ['チョコレート'],
      dislikes: ['退屈'],
      hobbies: ['温泉巡り'],
      skills: ['盤面掌握', '交渉術'],
      desc: [
        '政府のトップで、白いハツカネズミの純血。',
        '高い知性を持ち、物事を判断する力にも長けているが、自分の欲を優先することもある。',
        '子供っぽく駄々をこねる一面を持ちながらも、決して感情だけでは動かない。',
        '周囲を自分の掌の上で動かすことを楽しんでいる。',
        '',
        '世界を動かすのに、神である必要は無い。',
      ],
      voices: [
        { src: '' },
      ],
    },

    // 天道
    {
      id: 'tendo',
      world: 'world-a',
      affiliation: 'gov',
      thumb: 'img/oc/tendo/icon_tendo.webp',
      name: '{天道|てんどう}',
      forms: {
        human: {
          label: '変化',
          costumes: [
            { src: 'img/oc/tendo/tendo_h_01.webp', label: 'デフォルト' },
          ],
        },
        nonhuman: {
          label: '通常',
          costumes: [
            { src: '', label: 'デフォルト' },
          ],
        },
      },
      facts: [
        ['性別', '可変'],
        ['身長', '通常142cm、変化130cm(尻尾を除く)'],
        ['一人称', '私(たまに俺)'],
        ['二人称', '貴様、お前'],
      ],
      likes: ['少女漫画'],
      dislikes: ['忍者'],
      hobbies: ['鍛錬'],
      skills: ['槍術'],
      desc: [
        '政府の槍使いで、八咫烏の純血。',
        '天宮の従者。その命を守ることを何よりも優先している。',
        '真面目で堅く、怒りっぽい性格。',
        '忍者たちのことはあまり好いておらず、邪魔をする者には容赦しない。',
        '翼を使用しての飛行が可能。',
        '',
        '殺されても、朝を呼ぶ。',
        '仕事だ。',
      ],
      voices: [
        { src: '' },
      ],
    },

    // いりてい太
    {
      id: 'irite-ta',
      world: 'world-b',
      name: 'いりてい{太|た}',
      forms: {
        human: {
          label: '人間形態',
          costumes: [
            { src: '', label: 'デフォルト' },
          ],
        },
        nonhuman: {
          label: '恐竜形態',
          costumes: [
            { src: '', label: 'デフォルト' },
          ],
        },
      },
      facts: [
        ['性別', '男'],
        ['身長', '通常???cm、変化150cm(尻尾を除く)'],
        ['一人称', '俺'],
        ['二人称', 'お前、呼び捨て'],
      ],
      likes: ['魚'],
      dislikes: ['???'],
      hobbies: ['発掘作業', '館内ガイド'],
      skills: ['???'],
      desc: [
        'キャラクターデザイン: Riddy・Cult',
        '',
        'いりてい太（学名: Iritei-ta）は、約1億1000万年前に前期白亜紀のブラジルに生息した、スピノサウルス科に属する獣脚類の恐竜「イリテーター」（イリタトルとも、学名: Irritator）が現代に蘇った姿である。',
        '化石はほぼ完全な頭骨で発見され、化石商人がこの頭骨を入手して自然史博物館に違法販売した。',
        'しかし、化石商人は頭蓋骨の損傷を石膏でひどく隠し、継ぎ接ぎにしていた。結果、腐食、破損、侵食により、発掘時からさらに損傷することとなる。',
        '属名は英語で「苛立ち」を意味する "irritation" に由来し、古生物学者の感情を反映している。',
        '',
        '胴体部は、ほぼ全てが透明な水入り琥珀（英: Enhydro Amber、エンハイドロ・アンバー）の組織で構成されている。',
        'この琥珀の内部には未知の「蟹」が定住しており、食事の消化を手伝うなど、恐竜と甲殻類による前例のない相利共生関係を築いている。',
        '元となった化石の発見経緯も影響してか、その性質は怒りっぽく、かつ真面目（几帳面）な生態を示す。',
      ],
      voices: [
        { src: '' },
      ],
    },
  ],
};
