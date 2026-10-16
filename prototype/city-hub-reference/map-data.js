/* NewLife Quest — approved 2026-10-16 City Hub visual alignment.
 * Reference: the owner's 1672x941 image "ChatGPT Image Oct 14, 2026, 10_48_32 PM.png".
 * This is City Hub scene-space data, NOT the walkable Tiled village map.
 * Hit polygons cover actual buildings/sites, not the labels in the mockup.
 * The source image is NOT committed; import a clean, text-free layered version later.
 */
(function (root) {
  "use strict";
  root.NewLifeCityHubMap = Object.freeze({
    id: "ternhaven-city-hub",
    revision: "2026-10-16-reference-v1",
    image: {
      width: 1672,
      height: 941,
      sourceFilename: "ChatGPT Image Oct 14, 2026, 10_48_32 PM.png",
      sourceSha256: "7b487a85af32a601ad818d7f8c91c75d583ee7ee59b2078a97213720a12f7438",
      repoAsset: "assets/city-hub/city-hub-reference.png",
      assetCommitted: false,
      containsBakedLabelsAndHUD: true
    },
    worldId: "ternhaven",
    defaultLocale: "th-TH",
    places: [
      {
        id: "smithy", serviceId: "smithy", names: { "th-TH": "โรงตีเหล็ก", "en-US": "Smithy" },
        position: "upper-left",
        polygon: [[96,232],[156,170],[329,172],[413,218],[395,325],[278,352],[113,327]]
      },
      {
        id: "honor-hall", serviceId: "honor-hall", names: { "th-TH": "หอเกียรติยศ", "en-US": "Hall of Honor" },
        position: "upper-mid-left",
        polygon: [[489,171],[509,110],[552,77],[617,90],[673,147],[681,277],[612,319],[519,288]]
      },
      {
        id: "adventurer-guild", serviceId: "guild", names: { "th-TH": "กิลด์นักผจญภัย", "en-US": "Adventurer Guild" },
        position: "upper-center",
        polygon: [[659,334],[720,273],[880,256],[945,304],[964,414],[901,463],[682,450],[654,388]]
      },
      {
        id: "auction-house", serviceId: "auction", names: { "th-TH": "ประมูล", "en-US": "Auction House" },
        position: "upper-right",
        polygon: [[995,235],[1038,189],[1152,163],[1236,221],[1234,350],[1114,387],[1003,344]]
      },
      {
        id: "dungeon-gate", serviceId: "underfold-gate", names: { "th-TH": "ดันเจี้ยน", "en-US": "Dungeon" },
        position: "top-right",
        polygon: [[1419,164],[1451,119],[1524,97],[1574,150],[1588,263],[1523,318],[1401,285],[1399,211]]
      },
      {
        id: "market", serviceId: "market", names: { "th-TH": "ตลาด", "en-US": "Market" },
        position: "middle-left",
        polygon: [[63,437],[92,386],[289,376],[431,401],[454,492],[374,535],[90,536],[59,488]]
      },
      {
        id: "wedding-chapel", serviceId: "wedding", names: { "th-TH": "โบสถ์วิวาห์", "en-US": "Wedding Chapel" },
        position: "middle-lower-left",
        polygon: [[467,509],[520,436],[568,377],[621,404],[647,463],[692,505],[705,623],[635,672],[518,657],[457,605]]
      },
      {
        id: "academy", serviceId: "academy", names: { "th-TH": "สำนักศึกษา", "en-US": "Academy" },
        position: "lower-left",
        polygon: [[114,604],[158,551],[316,542],[404,615],[398,705],[301,728],[134,711],[111,665]]
      },
      {
        id: "hot-springs", serviceId: "hot-springs", names: { "th-TH": "บ่อน้ำพุร้อน", "en-US": "Hot Springs" },
        position: "middle-right",
        polygon: [[1262,481],[1331,439],[1429,411],[1546,448],[1580,533],[1551,633],[1458,677],[1318,648],[1233,560]]
      },
      {
        id: "river-harbor", serviceId: "harbor", names: { "th-TH": "ท่าเรือแม่น้ำ", "en-US": "River Harbor" },
        position: "lower-right",
        polygon: [[945,671],[1010,621],[1178,611],[1345,666],[1357,730],[1294,789],[963,791],[908,739]]
      }
    ],
    // Composition/UI reservations; these are not clickable town locations.
    uiSafeAreas: [
      { id: "character-status", x: 0, y: 0, width: 321, height: 101 },
      { id: "brand-logo", x: 696, y: 0, width: 291, height: 139 },
      { id: "currency-and-settings", x: 1164, y: 0, width: 508, height: 93 },
      { id: "right-quick-actions", x: 1589, y: 120, width: 83, height: 305 },
      { id: "chat-expanded", x: 0, y: 740, width: 433, height: 201 },
      { id: "bottom-right-toolbar", x: 898, y: 819, width: 774, height: 122 }
    ],
    // These were in the earlier gameplay plan, but are NOT visible/labeled in
    // the 2026-10-16-approved illustration. Do not invent hotspots for them.
    notDepictedInReference: ["inn", "clinic", "training-yard", "town-gate"],
    interaction: {
      accessibleFrom: ["mouse", "touch", "keyboard"],
      regionFollows: "building-silhouette",
      backendState: "not-implemented",
      dungeonAccess: "must-check-eligibility",
      locationIdsIndependentOfLocale: true
    }
  });
})(globalThis);
