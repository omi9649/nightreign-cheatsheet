// Static game data: Nightlord schedules/stats, shields, Great Hollow spots.

const scheduleData = {
    "TRICEPHALOS": {
        "Night 1": ["Bell Bearing Hunter", "Demi-Human Queen"],
        "Night 2": ["Fell Omen", "Tree Sentinel"]
    },
    "GAPING JAW": {
        "Night 1": ["Duke's Dear Freja", "Gaping Dragon", "Night's Cavalries", "Valiant Gargoyle", "Wormface"],
        "Night 2": ["Ancient Dragon", "Crucible Knight", "Outland Commander"]
    },
    "SENTIENT PEST": {
        "Night 1": ["Battlefield Commander", "Centipede Demon", "Smelter Demon", "Tibia Mariner", "Ulcerated Tree Spirit"],
        "Night 2": ["Draconic Tree Sentinel", "Great Wyrm", "Nox Dragonkin Soldier"]
    },
    "AUGUR": {
        "Night 1": ["Gaping Dragon", "Grafted Monarch", "Smelter Demon", "Valiant Gargoyle", "Wormface"],
        "Night 2": ["Fallingstar Beast", "Godskin Duo", "Tree Sentinel"]
    },
    "EQUILIBRIOUS BEAST": {
        "Night 1": ["Battlefield Commander", "Centipede Demon", "Duke's Dear Freja", "Royal Revenant", "Tibia Mariner"],
        "Night 2": ["Crucible Knight", "Death Rite Bird", "Godskin Duo"]
    },
    "DARKDRIFT KNIGHT": {
        "Night 1": ["Centipede Demon", "Gaping Dragon", "Night's Cavalry", "Royal Revenant", "Wormface"],
        "Night 2": ["Nameless King", "Nox Dragonkin Soldier", "Outland Commander"]
    },
    "FISSURE IN THE FOG": {
        "Night 1": ["Duke's Dear Freja", "Grafted Monarch", "Smelter Demon", "Tibia Mariner", "Ulcerated Tree Spirit"],
        "Night 2": ["Dancer of the Boreal Valley", "Draconic Tree Sentinel", "Godskin Duo"]
    },
    "NIGHT ASPECT": {
        "Night 1": ["Battlefield Commander", "Bell Bearing Hunter", "Centipede Demon", "Demi-Human Queen", "Gaping Dragon", "Grafted Monarch", "Night's Cavalry", "Royal Revenant", "Smelter Demon", "Valiant Gargoyle"],
        "Night 2": ["Ancient Dragon", "Crucible Knight", "Dancer of the Boreal Valley", "Death Rite Bird", "Draconic Tree Sentinel", "Fell Omen", "Fallingstar Beast", "Great Wyrm", "Nameless King", "Nox Dragonkin Soldier", "Outland Commander"]
    },
    "BALANCERS": {
        "Night 1": ["Demon in Pain & Demon from Below", "Curseblade & Divine Beast Warrior"],
        "Night 2": ["Demon Prince", "Lord of Blood"]
    },
    "DREGLORD": {
        "Night 1": ["Death Knight", "Great Red Bear"],
        "Night 2": ["Knight Artorias", "Divine Beast Dancing Lion"]
    }
};

const nightlordStats = {
    "TRICEPHALOS": { weakness: "Holy", damage: "Fire" },
    "GAPING JAW": { weakness: "Poison", damage: "Lightning" },
    "SENTIENT PEST": { weakness: "Fire", damage: "Magic" },
    "AUGUR": { weakness: "Lightning", damage: "Magic" },
    "EQUILIBRIOUS BEAST": { weakness: "Holy", damage: "Holy" },
    "DARKDRIFT KNIGHT": { weakness: "Lightning", damage: "Holy" },
    "FISSURE IN THE FOG": { weakness: "Fire", damage: "Magic" },
    "NIGHT ASPECT": { weakness: "Holy", damage: "Magic" },
    "BALANCERS": { weakness: "Sleep", damage: "Standard" },
    "DREGLORD": { weakness: "Holy", damage: "Magic" }
};


const nightlordDamageData = {
    "TRICEPHALOS": [
        { label: null,
          phys: { Standard: 0, Slash: 0, Strike: 0, Pierce: -10 },
          elem: { Magic: 0, Fire: 50, Lightning: 0, Holy: -35 },
          status: { Poison: 542, "Scarlet Rot": 252, Bleed: 252, Frostbite: 542, Madness: "X", Sleep: 154 } }
    ],
    "GAPING JAW": [
        { label: null,
          phys: { Standard: 0, Slash: 0, Strike: 0, Pierce: 0 },
          elem: { Magic: 0, Fire: 20, Lightning: 50, Holy: 0 },
          status: { Poison: 154, "Scarlet Rot": 154, Bleed: 542, Frostbite: 154, Madness: "X", Sleep: 154 } }
    ],
    "SENTIENT PEST": [
        { label: "Gnoster (Moth)",
          phys: { Standard: -15, Slash: -25, Strike: -15, Pierce: -25 },
          elem: { Magic: 50, Fire: -40, Lightning: 10, Holy: 10 },
          status: { Poison: 542, "Scarlet Rot": 154, Bleed: 154, Frostbite: 154, Madness: "X", Sleep: 542 } },
        { label: "Faurtis (Scorpion)",
          phys: { Standard: 10, Slash: 20, Strike: -20, Pierce: -10 },
          elem: { Magic: 10, Fire: -35, Lightning: 10, Holy: 10 },
          status: { Poison: 252, "Scarlet Rot": 154, Bleed: 154, Frostbite: 154, Madness: "X", Sleep: 154 } }
    ],
    "AUGUR": [
        { label: null,
          phys: { Standard: 0, Slash: -15, Strike: 20, Pierce: 10 },
          elem: { Magic: 20, Fire: 50, Lightning: -40, Holy: 15 },
          status: { Poison: "X", "Scarlet Rot": 252, Bleed: "X", Frostbite: 252, Madness: "X", Sleep: "X" } }
    ],
    "EQUILIBRIOUS BEAST": [
        { label: null,
          phys: { Standard: 0, Slash: -10, Strike: 0, Pierce: 0 },
          elem: { Magic: 20, Fire: -20, Lightning: 0, Holy: -35 },
          status: { Poison: 154, "Scarlet Rot": 154, Bleed: 252, Frostbite: 252, Madness: 154, Sleep: "X" } }
    ],
    "DARKDRIFT KNIGHT": [
        { label: null,
          phys: { Standard: 0, Slash: 0, Strike: 0, Pierce: 0 },
          elem: { Magic: 0, Fire: 0, Lightning: -20, Holy: 30 },
          status: { Poison: 154, "Scarlet Rot": 154, Bleed: 154, Frostbite: 154, Madness: "X", Sleep: 154 } }
    ],
    "FISSURE IN THE FOG": [
        { label: null,
          phys: { Standard: 0, Slash: 15, Strike: -15, Pierce: 10 },
          elem: { Magic: 20, Fire: -35, Lightning: 20, Holy: 20 },
          status: { Poison: 252, "Scarlet Rot": 252, Bleed: 252, Frostbite: 542, Madness: "X", Sleep: 542 } }
    ],
    "NIGHT ASPECT": [
        { label: "Phase 1",
          phys: { Standard: 0, Slash: -15, Strike: 10, Pierce: -10 },
          elem: { Magic: 0, Fire: -20, Lightning: 0, Holy: -35 },
          status: { Poison: "X", "Scarlet Rot": 252, Bleed: "X", Frostbite: "X", Madness: "X", Sleep: 542 } },
        { label: "Phase 2",
          phys: { Standard: 0, Slash: 10, Strike: -10, Pierce: -15 },
          elem: { Magic: 0, Fire: 0, Lightning: -20, Holy: -20 },
          status: { Poison: "X", "Scarlet Rot": 252, Bleed: "X", Frostbite: "X", Madness: "X", Sleep: 542 } }
    ],
    "BALANCERS": [
        { label: null,
          phys: { Standard: 0, Slash: 8, Strike: -10, Pierce: 0 },
          elem: { Magic: 0, Fire: 8, Lightning: 10, Holy: 30 },
          status: { Poison: 252, "Scarlet Rot": 252, Bleed: 252, Frostbite: 252, Madness: "X", Sleep: 84 } }
    ],
    "DREGLORD": [
        { label: "Phase 1",
          phys: { Standard: 0, Slash: -10, Strike: 0, Pierce: -10 },
          elem: { Magic: 0, Fire: -20, Lightning: 10, Holy: -25 },
          status: { Poison: 542, "Scarlet Rot": 542, Bleed: 252, Frostbite: 252, Madness: "X", Sleep: 252 } },
        { label: "Phase 2",
          phys: { Standard: 5, Slash: -5, Strike: 5, Pierce: -5 },
          elem: { Magic: 5, Fire: -10, Lightning: 15, Holy: -15 },
          status: { Poison: 542, "Scarlet Rot": 542, Bleed: 542, Frostbite: "X", Madness: "X", Sleep: 999 } }
    ]
};


const shieldData = [
    { id: 1, name: "Guardian's Greatshield", rarity: "grey", url: "https://eldenringnightreign.wiki.fextralife.com/Guardian's+Greatshield",
      magic: 59, fire: 66, lightning: 53, holy: 62,
      guardTiers: [79, 70, 60], img: "guardians_greatshiweapon_elden_ring_nightreign_wiki_guide", ailment: null },
    { id: 2, name: "Ant's Skull Plate", rarity: "purple", url: "https://eldenringnightreign.wiki.fextralife.com/Ant's+Skull+Plate",
      magic: 64, fire: 48, lightning: 64, holy: 64,
      guardTiers: [78], img: "ants_skull_plate_elden_ring_nightreign_wiki_guide_200px", ailment: "Poison (84)" },
    { id: 3, name: "Briar Greatshield", rarity: "blue", url: "https://eldenringnightreign.wiki.fextralife.com/Briar+Greatshield",
      magic: 62, fire: 54, lightning: 62, holy: 62,
      guardTiers: [78, 68], img: "briar_greatshield_elden_ring_nightreign_wiki_guide_200px", ailment: "Blood Loss (51)" },
    { id: 4, name: "Distinguished Greatshield", rarity: "blue", url: "https://eldenringnightreign.wiki.fextralife.com/Distinguished+Greatshield",
      magic: 64, fire: 62, lightning: 54, holy: 60,
      guardTiers: [79, 70], img: "distinguished_greatshield_shields_elden_ring_nightreign_wiki_guide_200px", ailment: null },
    { id: 5, name: "Crucible Hornshield", rarity: "purple", url: "https://eldenringnightreign.wiki.fextralife.com/Crucible+Hornshield",
      magic: 58, fire: 57, lightning: 52, holy: 73,
      guardTiers: [81], img: "crucible_hornshield_elden_ring_nightreign_wiki_guide_200px", ailment: null },
    { id: 6, name: "Cuckoo Greatshield", rarity: "blue", url: "https://eldenringnightreign.wiki.fextralife.com/Cuckoo+Greatshield",
      magic: 71, fire: 56, lightning: 52, holy: 61,
      guardTiers: [79, 70], img: "cuckoo_greatshield_elden_ring_nightreign_wiki_guide_200px", ailment: null },
    { id: 7, name: "Eclipse Crest Greatshield", rarity: "blue", url: "https://eldenringnightreign.wiki.fextralife.com/Eclipse+Crest+Greatshield",
      magic: 73, fire: 57, lightning: 51, holy: 59,
      guardTiers: [81, 71], img: "eclipse_crest_greatshield_elden_ring_nightreign_wiki_guide_200px", ailment: null },
    { id: 8, name: "Dragonclaw Shield", rarity: "purple", url: "https://eldenringnightreign.wiki.fextralife.com/Dragonclaw+Shield",
      magic: 55, fire: 55, lightning: 80, holy: 50,
      guardTiers: [80], img: "dragonclaw_shield_elden_ring_nightreign_wiki_guide_200px", ailment: null },
    { id: 9, name: "Erdtree Greatshield", rarity: "purple", url: "https://eldenringnightreign.wiki.fextralife.com/Erdtree+Greatshield",
      magic: 67, fire: 50, lightning: 46, holy: 77,
      guardTiers: [81], img: "erdtree_greatshield_elden_ring_nightreign_wiki_guide_200px", ailment: null },
    { id: 10, name: "Fingerprint Stone Shield", rarity: "purple", url: "https://eldenringnightreign.wiki.fextralife.com/Fingerprint+Stone+Shield",
      magic: 59, fire: 62, lightning: 61, holy: 58,
      guardTiers: [82], img: "fingerprint_stone_shield_greatshield_elden_ring_nightreign_wiki_guide_200px", ailment: "Madness (56)" },
    { id: 11, name: "Gilded Greatshield", rarity: "blue", url: "https://eldenringnightreign.wiki.fextralife.com/Gilded+Greatshield",
      magic: 59, fire: 65, lightning: 52, holy: 64,
      guardTiers: [82, 72], img: "gilded_greatshield_elden_ring_nightreign_wiki_guide_200px", ailment: null },
    { id: 12, name: "Golden Beast Crest Shield", rarity: "blue", url: "https://eldenringnightreign.wiki.fextralife.com/Golden+Beast+Crest+Shield",
      magic: 62, fire: 62, lightning: 54, holy: 62,
      guardTiers: [78, 69], img: "golden_beast_crest_shield_elden_ring_nightreign_wiki_guide_200px", ailment: null },
    { id: 13, name: "Golden Greatshield", rarity: "blue", url: "https://eldenringnightreign.wiki.fextralife.com/Golden+Greatshield",
      magic: 57, fire: 60, lightning: 57, holy: 66,
      guardTiers: [83, 73], img: "golden_greatshield_elden_ring_nightreign_wiki_guide_200px", ailment: null },
    { id: 14, name: "Haligtree Crest Greatshield", rarity: "blue", url: "https://eldenringnightreign.wiki.fextralife.com/Haligtree+Crest+Greatshield",
      magic: 56, fire: 61, lightning: 50, holy: 73,
      guardTiers: [79, 70], img: "haligtree_crest_greatshield_elden_ring_nightreign_wiki_guide_200px", ailment: null },
    { id: 15, name: "Icon Shield", rarity: "blue", url: "https://eldenringnightreign.wiki.fextralife.com/Icon+Shield",
      magic: 61, fire: 56, lightning: 63, holy: 60,
      guardTiers: [81, 71], img: "icon_shield_elden_ring_nightreign_wiki_guide_200px", ailment: null },
    { id: 16, name: "Jellyfish Shield", rarity: "purple", url: "https://eldenringnightreign.wiki.fextralife.com/Jellyfish+Shield",
      magic: 65, fire: 65, lightning: 50, holy: 60,
      guardTiers: [78], img: "jellyfish_shield_elden_ring_nightreign_wiki_guide_200px", ailment: null },
    { id: 17, name: "One-Eyed Shield", rarity: "purple", url: "https://eldenringnightreign.wiki.fextralife.com/One-Eyed+Shield",
      magic: 55, fire: 67, lightning: 57, holy: 61,
      guardTiers: [80], img: "one_eyed_shield_elden_ring_nightreign_wiki_guide_200px", ailment: null },
    { id: 18, name: "Visage Shield", rarity: "purple", url: "https://eldenringnightreign.wiki.fextralife.com/Visage+Shield",
      magic: 55, fire: 72, lightning: 58, holy: 55,
      guardTiers: [79], img: "visage_shield_elden_ring_nightreign_wiki_guide_200px", ailment: null },
    { id: 19, name: "Wooden Greatshield", rarity: "grey", url: "https://eldenringnightreign.wiki.fextralife.com/Wooden+Greatshield",
      magic: 63, fire: 52, lightning: 65, holy: 60,
      guardTiers: [75, 66, 57], img: "wooden_greatshield_elden_ring_nightreign_wiki_guide_200px", ailment: null },
    { id: 20, name: "Spiked Palisade Shield", rarity: "blue", url: "https://eldenringnightreign.wiki.fextralife.com/Spiked+Palisade+Shield",
      magic: 61, fire: 54, lightning: 65, holy: 60,
      guardTiers: [67], img: "spiked_palisade_shield_elden_ring_nightreign_wiki_guide_200px", ailment: "Blood Loss (51)" },
    { id: 21, name: "Redmane Greatshield", rarity: "blue", url: "https://eldenringnightreign.wiki.fextralife.com/Redmane+Greatshield",
      magic: 57, fire: 73, lightning: 56, holy: 54,
      guardTiers: [69], img: "redmane_greatshield_elden_ring_nightreign_wiki_guide_200px", ailment: null },
    { id: 22, name: "Crossed-Tree Towershield", rarity: "grey", url: "https://eldenringnightreign.wiki.fextralife.com/Crossed-Tree+Towershield",
      magic: 56, fire: 66, lightning: 52, holy: 66,
      guardTiers: [82, 72, 62], img: "crossed_tree_towershield_greatshield_elden_ring_nightreign_wiki_guide_200px", ailment: null },
    { id: 23, name: "Dragon Towershield", rarity: "grey", url: "https://eldenringnightreign.wiki.fextralife.com/Dragon+Towershield",
      magic: 59, fire: 66, lightning: 53, holy: 62,
      guardTiers: [83, 73, 63], img: "dragon_towershield_greatshield_elden_ring_nightreign_wiki_guide_200px", ailment: null },
    { id: 24, name: "Inverted Hawk Towershield", rarity: "grey", url: "https://eldenringnightreign.wiki.fextralife.com/Inverted+Hawk+Towershield",
      magic: 65, fire: 56, lightning: 54, holy: 65,
      guardTiers: [79, 70, 60], img: "invert_hawk_towershield_greatshield_elden_ring_nightreign_wiki_guide_200px", ailment: null },
    { id: 25, name: "Manor Towershield", rarity: "grey", url: "https://eldenringnightreign.wiki.fextralife.com/Manor+Towershield",
      magic: 66, fire: 66, lightning: 52, holy: 56,
      guardTiers: [81, 71, 61], img: "manor_towershield_greatshield_elden_ring_nightreign_wiki_guide_200px", ailment: null },
    { id: 26, name: "Lordsworn's Shield", rarity: "grey", url: "https://eldenringnightreign.wiki.fextralife.com/Lordsworn's+Shield",
      magic: 62, fire: 52, lightning: 63, holy: 63,
      guardTiers: [77, 68, 59], img: "lordsworns_shield_greatshield_nightreign_wiki_guide_200px", ailment: null }
];

// ---- Great Hollow crystal finder ----
// x/y are % of img/great_hollow_map.webp (2048x2048). cfg lists the
// crystal configurations that spawn a crystal at that spot.
const GH_CONFIGS = ['A', 'B', 'C', 'D'];
const ghSpots = [
    // surface
    { x: 36.5, y: 19.8, cfg: ['C'] },
    { x: 67.7, y: 18.3, cfg: ['B'] },
    { x: 26.7, y: 34.0, cfg: ['B', 'C'] },
    { x: 32.7, y: 37.6, cfg: ['A', 'D'] },
    { x: 46.6, y: 33.1, cfg: ['A'] },
    { x: 60.0, y: 35.8, cfg: ['C', 'D'] },
    { x: 69.9, y: 36.7, cfg: ['A'] },
    { x: 13.9, y: 39.5, cfg: ['B', 'D'] },
    { x: 36.3, y: 49.3, cfg: ['A', 'B'] },
    { x: 8.3, y: 54.2, cfg: ['A'] },
    { x: 18.1, y: 53.3, cfg: ['C'] },
    { x: 29.5, y: 54.2, cfg: ['C', 'D'] },
    { x: 43.3, y: 60.7, cfg: ['D'] },
    { x: 24.9, y: 71.8, cfg: ['B', 'C'] },
    { x: 33.4, y: 74.5, cfg: ['D'] },
    // underground (bottom-right zone)
    { x: 87.7, y: 70.0, cfg: ['B'] },
    { x: 84.1, y: 79.4, cfg: ['C'] },
    { x: 93.1, y: 79.7, cfg: ['A', 'D'] },
    { x: 77.6, y: 84.2, cfg: ['C', 'D'] },
    { x: 80.1, y: 91.1, cfg: ['A', 'B'] },
    { x: 90.4, y: 90.7, cfg: ['A', 'B'] },
];
