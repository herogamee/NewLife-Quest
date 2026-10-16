import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const script = await readFile(new URL('./map-data.js', import.meta.url), 'utf8');
const context = {};
vm.runInNewContext(script, context, { filename: 'map-data.js' });
const map = context.NewLifeCityHubMap;
const ids = ['smithy','honor-hall','adventurer-guild','auction-house','dungeon-gate','market','wedding-chapel','academy','hot-springs','river-harbor'];

test('approved image coordinate system and precisely ten distinct pictured locations', () => {
  assert.equal(map.worldId, 'ternhaven');
  assert.equal(map.image.width, 1672);
  assert.equal(map.image.height, 941);
  assert.equal(map.image.assetCommitted, false);
  assert.equal(map.places.length, 10);
  assert.deepEqual([...map.places.map(p => p.id)].sort(), [...ids].sort());
});

test('each building has bilingual labels, stable service ID and valid hit polygon', () => {
  for (const place of map.places) {
    assert.ok(place.names['th-TH']);
    assert.ok(place.names['en-US']);
    assert.ok(place.serviceId);
    assert.ok(place.polygon.length >= 3);
    for (const [x, y] of place.polygon) {
      assert.ok(x >= 0 && x <= 1672, place.id + ' x out of range');
      assert.ok(y >= 0 && y <= 941, place.id + ' y out of range');
    }
  }
});

test('unpictured services do not secretly map onto a pictured building', () => {
  assert.deepEqual([...map.notDepictedInReference].sort(), ['clinic','inn','town-gate','training-yard'].sort());
  for (const missingId of map.notDepictedInReference) {
    assert.ok(!map.places.some(p => p.id === missingId));
  }
});

test('named HUD/chat/toolbar reservations are bounded by scene coordinate system', () => {
  const keys = map.uiSafeAreas.map(z => z.id);
  assert.ok(keys.includes('chat-expanded'));
  assert.ok(keys.includes('bottom-right-toolbar'));
  for (const zone of map.uiSafeAreas) {
    assert.ok(zone.x >= 0 && zone.y >= 0);
    assert.ok(zone.width > 0 && zone.height > 0);
    assert.ok(zone.x + zone.width <= map.image.width);
    assert.ok(zone.y + zone.height <= map.image.height);
  }
});

test('high priority central guild, top-right dungeon, and lower-left academy are in expected regions', () => {
  const byId = Object.fromEntries(map.places.map(p => [p.id, p]));
  const centroid = place => place.polygon.reduce((r, [x,y]) => ({x:r.x+x/place.polygon.length,y:r.y+y/place.polygon.length}),{x:0,y:0});
  const guild = centroid(byId['adventurer-guild']);
  const dungeon = centroid(byId['dungeon-gate']);
  const academy = centroid(byId.academy);
  assert.ok(guild.x > 600 && guild.x < 1000 && guild.y < 500);
  assert.ok(dungeon.x > 1350 && dungeon.y < 330);
  assert.ok(academy.x < 420 && academy.y > 500);
});


function contains(point, polygon) {
  const [px,py] = point;
  let inside = false;
  for (let i=0,j=polygon.length-1;i<polygon.length;j=i++) {
    const [ax,ay] = polygon[i], [bx,by] = polygon[j];
    if ((ay>py)!==(by>py) && px<(bx-ax)*(py-ay)/(by-ay)+ax) inside=!inside;
  }
  return inside;
}
function sampledOverlap(a,b) {
  const xMin=Math.max(Math.min(...a.map(p=>p[0])),Math.min(...b.map(p=>p[0])));
  const xMax=Math.min(Math.max(...a.map(p=>p[0])),Math.max(...b.map(p=>p[0])));
  const yMin=Math.max(Math.min(...a.map(p=>p[1])),Math.min(...b.map(p=>p[1])));
  const yMax=Math.min(Math.max(...a.map(p=>p[1])),Math.max(...b.map(p=>p[1])));
  for(let y=Math.ceil(yMin);y<yMax;y+=2)
    for(let x=Math.ceil(xMin);x<xMax;x+=2)
      if(contains([x,y],a)&&contains([x,y],b)) return true;
  return false;
}
test('building hit regions cannot overlap each other or the fixed interface reservations', () => {
  for (let i=0;i<map.places.length;i++){
    const a=map.places[i];
    for(let j=i+1;j<map.places.length;j++){
      const b=map.places[j];
      assert.ok(!sampledOverlap(a.polygon,b.polygon),a.id+' and '+b.id+' overlap');
    }
    for(const reserved of map.uiSafeAreas){
      const {x,y,width,height}=reserved;
      const rect=[[x,y],[x+width,y],[x+width,y+height],[x,y+height]];
      assert.ok(!sampledOverlap(a.polygon,rect),a.id+' intersects '+reserved.id);
    }
  }
});
