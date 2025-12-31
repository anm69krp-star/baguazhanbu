import React, { useMemo, useState, useEffect } from 'react';
import { CreditCard, HexagramData } from './components/CreditCard';

// --- DATA: Fuxi 64 Hexagrams with Modern Interpretation ---
const HEXAGRAMS: HexagramData[] = [
  { symbol: "䷀", name: "乾", pinyin: "Qián", nature: "天行健", desc: "元亨利贞。君子以自强不息。", luck: "上上", modern: "运势大吉。如龙飞天，事业宏图大展。宜积极进取，把握机会，但需刚健中正，不可骄傲自满。" },
  { symbol: "䷁", name: "坤", pinyin: "Kūn", nature: "地势坤", desc: "元亨，利牝马之贞。君子以厚德载物。", luck: "上上", modern: "吉运。宜顺从大势，以柔克刚，包容万物。厚积薄发，不争一时之短长，终有大成。" },
  { symbol: "䷂", name: "屯", pinyin: "Zhūn", nature: "水雷屯", desc: "元亨利贞。勿用有攸往，利建侯。", luck: "下下", modern: "万事起头难。目前处于困境或创业初期，阻力较大，宜守不宜进，耐心积蓄力量。" },
  { symbol: "䷃", name: "蒙", pinyin: "Méng", nature: "山水蒙", desc: "亨。匪我求童蒙，童蒙求我。", luck: "中下", modern: "时运未明，如迷雾遮眼。切勿鲁莽行动，应虚心向智者求教，启蒙智慧后再行事。" },
  { symbol: "䷄", name: "需", pinyin: "Xū", nature: "水天需", desc: "有孚，光亨，贞吉。利涉大川。", luck: "中上", modern: "等待时机。目前条件尚未成熟，需要耐心等待，积蓄实力，待时机一到即可大展宏图。" },
  { symbol: "䷅", name: "讼", pinyin: "Sòng", nature: "天水讼", desc: "有孚，窒惕，中吉，终凶。", luck: "下下", modern: "易生争执口角。凡事退一步海阔天空，避免与人发生冲突或诉讼，慎言慎行。" },
  { symbol: "䷆", name: "师", pinyin: "Shī", nature: "地水师", desc: "贞，丈人，吉无咎。", luck: "中上", modern: "行军用兵之象。宜统筹全局，严明纪律。此时适合团队合作，需有强有力的领导者带领。" },
  { symbol: "䷇", name: "比", pinyin: "Bǐ", nature: "水地比", desc: "吉。原筮，元永贞，无咎。", luck: "上上", modern: "亲近依附之意。贵人相助，朋友和睦。适合与人合作，建立良好的人际关系，事业顺利。" },
  { symbol: "䷈", name: "小畜", pinyin: "Xiǎo Chù", nature: "风天小畜", desc: "亨。密云不雨，自我西郊。", luck: "中下", modern: "力量有限，时机未到。虽有小成，但大事难成。宜蓄养力量，暂时忍耐，不可操之过急。" },
  { symbol: "䷉", name: "履", pinyin: "Lǚ", nature: "天泽履", desc: "履虎尾，不咥人，亨。", luck: "中平", modern: "如履薄冰。处境危险，需小心谨慎，步步为营。只要遵循礼仪，小心行事，终可化险为夷。" },
  { symbol: "䷊", name: "泰", pinyin: "Tài", nature: "地天泰", desc: "小往大来，吉亨。", luck: "上上", modern: "三阳开泰，否极泰来。阴阳调和，事事顺利。这是极好的运势，宜把握机会，大展拳脚。" },
  { symbol: "䷋", name: "否", pinyin: "Pǐ", nature: "天地否", desc: "否之匪人，不利君子贞，大往小来。", luck: "下下", modern: "闭塞不通。上下不和，小人当道。宜韬光养晦，独善其身，等待时局变化，不可强求。" },
  { symbol: "䷌", name: "同人", pinyin: "Tóng Rén", nature: "天火同人", desc: "同人于野，亨。利涉大川，利君子贞。", luck: "上上", modern: "志同道合。大家齐心协力，共同奋斗。利于合作、社交和公关，事业将得到众人的支持。" },
  { symbol: "䷍", name: "大有", pinyin: "Dà Yǒu", nature: "火天大有", desc: "元亨。", luck: "上上", modern: "如日中天，收获颇丰。运势极佳，名利双收。但也需注意满招损，保持谦虚，广结善缘。" },
  { symbol: "䷎", name: "谦", pinyin: "Qiān", nature: "地山谦", desc: "亨，君子有终。", luck: "上上", modern: "谦谦君子，卑以自牧。保持谦虚低调的态度，可获吉祥。越是谦虚，越能得到他人的尊重和帮助。" },
  { symbol: "䷏", name: "豫", pinyin: "Yù", nature: "雷地豫", desc: "利建侯行师。", luck: "中上", modern: "快乐安逸。时运顺畅，心情愉悦。利于出师、建功立业，但切忌沉溺享乐，需居安思危。" },
  { symbol: "䷐", name: "随", pinyin: "Suí", nature: "泽雷随", desc: "元亨利贞，无咎。", luck: "中上", modern: "顺其自然。随时变通，顺应时势。不要固执己见，灵活应对变化，跟随贤者，可获成功。" },
  { symbol: "䷑", name: "蛊", pinyin: "Gǔ", nature: "山风蛊", desc: "元亨，利涉大川。", luck: "中下", modern: "积弊已久。内部出现问题，需要进行整顿和改革。虽然困难，但若能下定决心革新，可转危为安。" },
  { symbol: "䷒", name: "临", pinyin: "Lín", nature: "地泽临", desc: "元亨利贞。至于八月有凶。", luck: "中上", modern: "居高临下，统御众人。运势渐长，宜积极进取。但需注意盛极必衰，未雨绸缪，防患于未然。" },
  { symbol: "䷓", name: "观", pinyin: "Guān", nature: "风地观", desc: "盥而不荐，有孚颙若。", luck: "中平", modern: "静观其变。目前宜多观察、多思考，不宜急于行动。展示诚意，树立榜样，等待时机。" },
  { symbol: "䷔", name: "噬嗑", pinyin: "Shì Hé", nature: "火雷噬嗑", desc: "亨。利用狱。", luck: "中平", modern: "咬碎硬骨头。面临困难和阻碍，必须采取强硬手段坚决铲除。就像执法一样，公正严明方能亨通。" },
  { symbol: "䷕", name: "贲", pinyin: "Bì", nature: "山火贲", desc: "亨。小利有攸往。", luck: "中平", modern: "文饰美化。重视外表的修饰和礼仪，有利于小事。但不可只有虚表，需注重内在的充实。" },
  { symbol: "䷖", name: "剥", pinyin: "Bō", nature: "山地剥", desc: "不利有攸往。", luck: "下下", modern: "剥落衰退。小人得志，君子道消。形势不利，宜谨言慎行，隐忍待时，不可轻举妄动。" },
  { symbol: "䷗", name: "复", pinyin: "Fù", nature: "地雷复", desc: "亨。出入无疾，朋来无咎。", luck: "中上", modern: "一阳来复，万象更新。低谷已过，运势开始回升。虽然进展缓慢，但前途光明，宜循序渐进。" },
  { symbol: "䷘", name: "无妄", pinyin: "Wú Wàng", nature: "天雷无妄", desc: "元亨利贞。其匪正有眚，不利有攸往。", luck: "中上", modern: "心存诚意，顺其自然。不要有非分之想，脚踏实地，顺应天道行事，自然吉祥。妄动则有灾。" },
  { symbol: "䷙", name: "大畜", pinyin: "Dà Chù", nature: "山天大畜", desc: "利贞。不家食吉，利涉大川。", luck: "上上", modern: "积蓄巨大。既有丰富的物质积累，又有深厚的道德修养。时机成熟，可以承担重任，大展宏图。" },
  { symbol: "䷚", name: "颐", pinyin: "Yí", nature: "山雷颐", desc: "贞吉。观颐，自求口实。", luck: "中平", modern: "修养身心。注意饮食起居和言语谨慎。如养育万物一般，需确立正确的目标，自我完善。" },
  { symbol: "䷛", name: "大过", pinyin: "Dà Guò", nature: "泽风大过", desc: "栋桡，利有攸往，亨。", luck: "中下", modern: "负担过重。面临巨大的压力和挑战，虽然形势严峻，但若能非常之举应对，或许能化险为夷。" },
  { symbol: "䷜", name: "坎", pinyin: "Kǎn", nature: "水习坎", desc: "习坎，有孚，维心亨，行有尚。", luck: "下下", modern: "重重险阻。如陷深渊，进退维谷。需保持信心，行险而不失诚信，运用智慧小心应对，终能脱险。" },
  { symbol: "䷝", name: "离", pinyin: "Lí", nature: "离为火", desc: "利贞，亨。畜牝牛，吉。", luck: "中上", modern: "光明附丽。如火一般热情光明，但需有所依附。柔顺中正，依附正道，可获吉祥。利于文书、艺术。" },
  { symbol: "䷞", name: "咸", pinyin: "Xián", nature: "泽山咸", desc: "亨，利贞，取女吉。", luck: "中上", modern: "感应沟通。心灵相通，感情和睦。利于恋爱、婚姻和人际交往。以诚感人，无往不利。" },
  { symbol: "䷟", name: "恒", pinyin: "Héng", nature: "雷风恒", desc: "亨，无咎，利贞，利有攸往。", luck: "中上", modern: "持之以恒。长久不变，坚持不懈。安守本分，不朝三暮四。在变动中保持原则，利于长远发展。" },
  { symbol: "䷠", name: "遯", pinyin: "Dùn", nature: "天山遯", desc: "亨，小利贞。", luck: "中下", modern: "退避保身。时运不济，小人渐长。宜急流勇退，明哲保身，不宜与之争锋，保存实力为上。" },
  { symbol: "䷡", name: "大壮", pinyin: "Dà Zhuàng", nature: "雷天大壮", desc: "利贞。", luck: "中上", modern: "声势壮大。运势强盛，正如日中天。但切忌鲁莽冲动，需严守正道，不可仗势欺人，方能长久。" },
  { symbol: "䷢", name: "晋", pinyin: "Jìn", nature: "火地晋", desc: "康侯用锡马蕃庶，昼日三接。", luck: "上上", modern: "旭日东升。步步高升，前程似锦。得到上司或贵人的赏识，晋升有望。宜积极进取，发光发热。" },
  { symbol: "䷣", name: "明夷", pinyin: "Míng Yí", nature: "地火明夷", desc: "利艰贞。", luck: "下下", modern: "光明受损。如太阳落入地中，贤能之士受压抑。宜韬光养晦，内敛才华，艰苦忍耐，等待黎明。" },
  { symbol: "䷤", name: "家人", pinyin: "Jiā Rén", nature: "风火家人", desc: "利女贞。", luck: "中上", modern: "家庭和睦。正如风从火出，各司其职。利于家庭事务和内部管理。家和万事兴，安内方能攘外。" },
  { symbol: "䷥", name: "睽", pinyin: "Kuí", nature: "火泽睽", desc: "小事吉。", luck: "中下", modern: "背道而驰。意见不合，产生分歧。大吉之事难成，小事尚可。宜求同存异，避免激化矛盾。" },
  { symbol: "䷦", name: "蹇", pinyin: "Jiǎn", nature: "水山蹇", desc: "利西南，不利东北；利见大人，贞吉。", luck: "下下", modern: "寸步难行。前有险阻，后有高山。此时不宜强进，应寻求有力人士的帮助，修身养德，待机而动。" },
  { symbol: "䷧", name: "解", pinyin: "Xiè", nature: "雷水解", desc: "利西南，无所往，其来复吉。", luck: "中上", modern: "困难消除。雷雨大作，阴霾尽散。问题得到解决，宜从速办理，不可拖延。赦免过错，宽以待人。" },
  { symbol: "䷨", name: "损", pinyin: "Sǔn", nature: "山泽损", desc: "有孚，元吉，无咎，可贞，利有攸往。", luck: "中平", modern: "损下益上。暂时牺牲眼前的利益，以换取长远的发展。虽然有损失，但只要诚心诚意，最终会有吉庆。" },
  { symbol: "䷩", name: "益", pinyin: "Yì", nature: "风雷益", desc: "利有攸往，利涉大川。", luck: "上上", modern: "损上益下。运势大好，得道多助。利于施展抱负，开展新事业。正如风雷激荡，气象万千，大有可为。" },
  { symbol: "䷪", name: "夬", pinyin: "Guài", nature: "泽天夬", desc: "扬于王庭，孚号，有厉，告自邑，不利即戎，利有攸往。", luck: "中平", modern: "决断清除。必须果断除去小人或弊端。公开宣布罪状，但不可动武，宜用和平手段解决，以防反噬。" },
  { symbol: "䷫", name: "姤", pinyin: "Gòu", nature: "天风姤", desc: "女壮，勿用取女。", luck: "中下", modern: "不期而遇。虽然有相遇的缘分，但多为露水情缘或不当关系。需防范女色或阴柔小人的侵害，不可长久。" },
  { symbol: "䷬", name: "萃", pinyin: "Cuì", nature: "泽地萃", desc: "亨。王假有庙，利见大人，亨，利贞。", luck: "上上", modern: "精英荟萃。人才济济，财物聚集。利于团体聚会，求见贵人。只要心地纯正，可成就大事。" },
  { symbol: "䷭", name: "升", pinyin: "Shēng", nature: "地风升", desc: "元亨，用见大人，勿恤，南征吉。", luck: "上上", modern: "如树生长。积小成大，步步高升。运势处于上升期，适合谋求发展，向南方发展更为吉利。" },
  { symbol: "䷮", name: "困", pinyin: "Kùn", nature: "泽水困", desc: "亨，贞，大人吉，无咎，有言不信。", luck: "下下", modern: "穷困潦倒。水干泽涸，处境艰难。此时言语无人相信，宜守正不阿，乐观处世，静待脱困之日。" },
  { symbol: "䷯", name: "井", pinyin: "Jǐng", nature: "水风井", desc: "改邑不改井，无丧无得，往来井井。", luck: "中平", modern: "修德养民。如井水一般，虽不移动但滋养万物。付出不求回报，宜安守本职，服务大众，通过积累获得成功。" },
  { symbol: "䷰", name: "革", pinyin: "Gé", nature: "泽火革", desc: "已日乃孚，元亨利贞，悔亡。", luck: "中上", modern: "除旧布新。时机成熟，必须进行改革。顺应民心，废除旧弊，建立新制。虽有阵痛，但最终吉祥。" },
  { symbol: "䷱", name: "鼎", pinyin: "Dǐng", nature: "火风鼎", desc: "元吉，亨。", luck: "上上", modern: "稳重图新。三足鼎立，稳重得当。除旧布新，接纳贤才。利于建立新的基业，象征权力和地位的稳固。" },
  { symbol: "䷲", name: "震", pinyin: "Zhèn", nature: "震为雷", desc: "亨。震来虩虩，笑言哑哑。震惊百里，不丧匕鬯。", luck: "中平", modern: "震惊百里。突发事变，令人恐慌。但只要从容镇定，处变不惊，不仅无害，反能因祸得福，声名大振。" },
  { symbol: "䷳", name: "艮", pinyin: "Gèn", nature: "艮为山", desc: "艮其背，不获其身，行其庭，不见其人，无咎。", luck: "中平", modern: "适时停止。面对重重阻碍，该停则停。动静失据会招致失败，宜安分守己，自我反省，不随波逐流。" },
  { symbol: "䷴", name: "渐", pinyin: "Jiàn", nature: "风山渐", desc: "女归吉，利贞。", luck: "上上", modern: "循序渐进。如大雁归来，有序而行。不可急躁，按部就班，水到渠成。利于嫁娶和长远发展。" },
  { symbol: "䷵", name: "归妹", pinyin: "Guī Mèi", nature: "雷泽归妹", desc: "征凶，无攸利。", luck: "下下", modern: "错位之象。违反常规，名不正言不顺。感情用事，后果堪忧。此时不宜主动出击，应安分守己。" },
  { symbol: "䷶", name: "丰", pinyin: "Fēng", nature: "雷火丰", desc: "亨，王假之，勿忧，宜日中。", luck: "上上", modern: "丰大盛满。运势极盛，如日中天，成果丰硕。但盛极必衰，宜居安思危，由于如日中天，宜抓紧时机。" },
  { symbol: "䷷", name: "旅", pinyin: "Lǚ", nature: "火山旅", desc: "小亨，旅贞吉。", luck: "中平", modern: "羁旅漂泊。如火在山上，居无定所。虽然不安定，但只要坚守正道，小事可成。适合外出旅行或出差。" },
  { symbol: "䷸", name: "巽", pinyin: "Xùn", nature: "巽为风", desc: "小亨，利有攸往，利见大人。", luck: "中上", modern: "顺从谦逊。如风无孔不入，顺应形势。柔顺而行，利于谋事，能得到贵人的帮助。但不可过于卑躬屈膝。" },
  { symbol: "䷹", name: "兑", pinyin: "Duì", nature: "兑为泽", desc: "亨，利贞。", luck: "中上", modern: "喜悦沟通。心情舒畅，善于言辞。利于社交和谈判，以和为贵。但也需防备口蜜腹剑，坚守正道。" },
  { symbol: "䷺", name: "涣", pinyin: "Huàn", nature: "风水涣", desc: "亨。王假有庙，利涉大川，利贞。", luck: "中下", modern: "离散化解。人心涣散，需要凝聚。同时也象征困难如冰雪消融。宜利用信仰或共同目标来团结人心，涉险过关。" },
  { symbol: "䷻", name: "节", pinyin: "Jié", nature: "水泽节", desc: "亨。苦节不可贞。", luck: "中平", modern: "节制有度。适度的节制是美德，但不可过分刻苦。制定规章制度，量力而行，不可铺张浪费，也不可吝啬。" },
  { symbol: "䷼", name: "中孚", pinyin: "Zhōng Fú", nature: "风泽中孚", desc: "豚鱼吉，利涉大川，利贞。", luck: "上上", modern: "诚信感通。心中诚信，能感动万物。只要诚心诚意，即使涉大川也能平安。诚信是立身之本，大吉。" },
  { symbol: "䷽", name: "小过", pinyin: "Xiǎo Guò", nature: "雷山小过", desc: "亨，利贞。可小事，不可大事。", luck: "中下", modern: "小有过度。小事可成，大事不宜。如飞鸟遗音，宜下不宜上。此时应低调行事，不可好高骛远。" },
  { symbol: "䷾", name: "既济", pinyin: "Jì Jì", nature: "水火既济", desc: "亨，小利贞，初吉终乱。", luck: "中上", modern: "大功告成。水火既济，阴阳调和。事情已成功，但需防盛极转衰。初吉终乱，要保持警惕，守住成果。" },
  { symbol: "䷿", name: "未济", pinyin: "Wèi Jì", nature: "火水未济", desc: "亨，小狐汔济，濡其尾，无攸利。", luck: "中下", modern: "未完成。事情尚未成功，正如火水不交。但也意味着充满希望和重新开始的机会。需审慎辨别，努力争取成功。" }
];

const ParticleBackground: React.FC = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${20 + Math.random() * 20}s`,
      opacity: 0.1 + Math.random() * 0.4, // Increased opacity slightly for dark mode
      size: `${2 + Math.random() * 3}px`
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-float bg-amber-100" // Changed to light gold
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
};

const App: React.FC = () => {
  // State Machine: 'deck' (ring view) -> 'shuffling' (fast spin) -> 'revealed' (single card)
  const [mode, setMode] = useState<'deck' | 'shuffling' | 'revealed'>('deck');
  const [selectedHexagram, setSelectedHexagram] = useState<HexagramData | null>(null);
  
  // For the ring visual, we just need a subset to look like a "deck"
  const ringCards = useMemo(() => HEXAGRAMS.slice(0, 12), []);
  const RADIUS = 600;
  const ANGLE_STEP = 360 / ringCards.length;

  const handleDivination = () => {
    if (mode === 'shuffling') return;
    
    // Start Shuffle
    setMode('shuffling');
    
    // After 2.5 seconds, pick a random card using Crypto Random for true randomness
    setTimeout(() => {
      const array = new Uint32Array(1);
      window.crypto.getRandomValues(array);
      const randomIndex = array[0] % HEXAGRAMS.length;
      
      setSelectedHexagram(HEXAGRAMS[randomIndex]);
      setMode('revealed');
    }, 2500);
  };

  const resetDivination = () => {
    setMode('deck');
    setTimeout(() => {
       setSelectedHexagram(null);
    }, 1000); // Wait for transition
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-neutral-950 font-sans selection:bg-amber-500/30">
      {/* Texture & Background */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>
      
      {/* Dynamic Background Gradients - Adjusted for Dark Mode */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-30%] left-[-10%] w-[80%] h-[80%] bg-indigo-900/20 rounded-full blur-[120px] animate-blob mix-blend-screen" />
        <div className="absolute top-[30%] right-[-20%] w-[70%] h-[70%] bg-fuchsia-900/10 rounded-full blur-[140px] animate-blob animation-delay-2000 mix-blend-screen" />
        <div