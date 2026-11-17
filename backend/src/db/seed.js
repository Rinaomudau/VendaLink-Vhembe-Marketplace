// Demo data for VendaLink. All accounts and listings below are fictional.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
}

const { initDb } = require('./database');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

async function seed() {
  const db = await initDb();
  console.log('🌱 Seeding VendaLink Vhembe demo database…');

  db.exec(`
    DELETE FROM notifications; DELETE FROM reviews;
    DELETE FROM messages;      DELETE FROM transactions;
    DELETE FROM runners;       DELETE FROM listings;
    DELETE FROM safe_zones;    DELETE FROM users;
  `);

  const hash = await bcrypt.hash('password123', 10);

  const users = [
    { id: uuidv4(), name: 'Rinao Mudau', phone: '0821234567', section: 'Thohoyandou CBD', initials: 'RM', verified: 1, anchors: 3, rating: 4.8, sales: 34, earned: 2400, runner: 0 },
    { id: uuidv4(), name: 'Ndangeni Khaukanani', phone: '0829876543', section: 'Sibasa', initials: 'NK', verified: 1, anchors: 5, rating: 4.9, sales: 42, earned: 3700, runner: 0 },
    { id: uuidv4(), name: 'Tshilidzi Blessings Mudau', phone: '0831112233', section: 'Muledane', initials: 'TB', verified: 1, anchors: 2, rating: 4.7, sales: 18, earned: 1200, runner: 0 },
    { id: uuidv4(), name: 'Tshanduko Mudau', phone: '0844445566', section: 'Shayandima', initials: 'TM', verified: 0, anchors: 1, rating: 4.5, sales: 7, earned: 980, runner: 0 },
    { id: uuidv4(), name: 'VendaLink Runner 1', phone: '0855556677', section: 'Thohoyandou CBD', initials: 'VP', verified: 1, anchors: 4, rating: 4.9, sales: 0, earned: 0, runner: 1, rt: 'bicycle', rr: 15 },
    { id: uuidv4(), name: 'VendaLink Runner 2', phone: '0866667788', section: 'Sibasa', initials: 'MT', verified: 1, anchors: 3, rating: 4.6, sales: 0, earned: 0, runner: 1, rt: 'foot', rr: 10 },
    { id: uuidv4(), name: 'VendaLink Runner 3', phone: '0877778899', section: 'Muledane', initials: 'KN', verified: 1, anchors: 2, rating: 4.8, sales: 0, earned: 0, runner: 1, rt: 'bicycle', rr: 12 },
    { id: uuidv4(), name: 'VendaLink Runner 4', phone: '0888889900', section: 'Tshakhuma', initials: 'VM', verified: 1, anchors: 3, rating: 4.7, sales: 0, earned: 0, runner: 1, rt: 'foot', rr: 8 },
    { id: uuidv4(), name: 'VendaLink Seller 1', phone: '0811223344', section: 'Lwamondo', initials: 'MS', verified: 1, anchors: 2, rating: 4.6, sales: 12, earned: 1800, runner: 0 },
    { id: uuidv4(), name: 'Tshililo Ndou', phone: '0890000001', section: 'Thohoyandou CBD', initials: 'TN', verified: 1, anchors: 2, rating: 4.7, sales: 9, earned: 950, runner: 0 },
    { id: uuidv4(), name: 'Pfano Masevhe', phone: '0890000002', section: 'Sibasa', initials: 'PM', verified: 1, anchors: 2, rating: 4.6, sales: 8, earned: 780, runner: 0 },
    { id: uuidv4(), name: 'Nkhumiseni Mabege', phone: '0890000003', section: 'Muledane', initials: 'NM', verified: 1, anchors: 1, rating: 4.5, sales: 6, earned: 620, runner: 0 },
    { id: uuidv4(), name: 'Lavhelesani Nndwa', phone: '0890000004', section: 'Shayandima', initials: 'LN', verified: 1, anchors: 2, rating: 4.8, sales: 11, earned: 1100, runner: 0 },
    { id: uuidv4(), name: 'Tshedza Nepile', phone: '0890000005', section: 'Tshakhuma', initials: 'TN', verified: 1, anchors: 1, rating: 4.6, sales: 5, earned: 540, runner: 0 },
    { id: uuidv4(), name: 'Kenneth Malambe', phone: '0890000006', section: 'Lwamondo', initials: 'KM', verified: 1, anchors: 2, rating: 4.7, sales: 10, earned: 890, runner: 0 },
  ];

  const insU = db.prepare(`INSERT INTO users
    (id,name,phone,password_hash,section,avatar_initials,is_verified,
     verification_anchors,rating,total_sales,total_earnings,is_runner,runner_transport,runner_rate)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);
  for (const u of users)
    insU.run(u.id,u.name,u.phone,hash,u.section,u.initials,
      u.verified,u.anchors,u.rating,u.sales,u.earned,u.runner,u.rt||null,u.rr||null);

  const insR = db.prepare(`INSERT INTO runners
    (id,user_id,transport,rate,is_online,current_section,total_deliveries,rating)
    VALUES (?,?,?,?,1,?,?,?)`);
  users.filter(u=>u.runner).forEach((u,i)=>
    insR.run(uuidv4(),u.id,u.rt,u.rr,u.section,[34,19,26,12][i]||10,u.rating));

  // Suggested public meeting areas only. These are not safety certifications.
  const insZ = db.prepare(`INSERT INTO safe_zones
    (id,name,type,section,distance_km,walk_minutes,hours,has_cctv)
    VALUES (?,?,?,?,?,?,?,?)`);
  [
    [uuidv4(),'Thavhani Mall public area','MALL','Thohoyandou CBD',0.8,10,'Confirm locally',0],
    [uuidv4(),'Thohoyandou CBD public area','PUBLIC','Thohoyandou CBD',0.5,7,'Confirm locally',0],
    [uuidv4(),'Sibasa shopping area','PUBLIC','Sibasa',0.7,9,'Confirm locally',0],
    [uuidv4(),'Shayandima public shopping area','PUBLIC','Shayandima',0.9,12,'Confirm locally',0],
    [uuidv4(),'Tshakhuma village centre public area','PUBLIC','Tshakhuma',0.6,8,'Confirm locally',0],
  ].forEach(z=>insZ.run(...z));

  const flashEnd = h => new Date(Date.now()+h*3_600_000)
    .toISOString().replace('T',' ').slice(0,19);

  const insL = db.prepare(`INSERT INTO listings
    (id,seller_id,title,description,price,category,condition,section,emoji,is_flash_sale,flash_ends_at,status)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,'active')`);

  const listings = [
    [uuidv4(),users[1].id,'Fresh vegetables bundle','Seasonal spinach, tomatoes and onions from a local grower.',35,'Food','New','Sibasa','🥬',1,flashEnd(2)],
    [uuidv4(),users[2].id,'Samsung Galaxy A14','Pre-owned phone in good working condition. Charger included.',850,'Electronics','Good','Muledane','📱',0,null],
    [uuidv4(),users[3].id,'School shoes — size 6','Pre-loved school shoes in good condition.',180,'Fashion','Good','Shayandima','👞',0,null],
    [uuidv4(),users[8].id,'Locally made peanut butter','Fresh small-batch peanut butter. Contact seller for collection details.',55,'Food','New','Lwamondo','🥜',0,null],
    [uuidv4(),users[1].id,'Free-range eggs — 30 pack','Fresh eggs. Collection in Sibasa.',65,'Food','New','Sibasa','🥚',1,flashEnd(3)],
    [uuidv4(),users[1].id,'Homemade chilli sauce','Small-batch chilli sauce made locally.',30,'Food','New','Sibasa','🌶️',1,flashEnd(5)],
    [uuidv4(),users[1].id,'Fresh baked scones','A pack of freshly baked scones. Order ahead.',40,'Food','New','Sibasa','🥐',1,flashEnd(1)],
    [uuidv4(),users[2].id,'Phone screen replacement','Phone repair service. Ask for a quote before booking.',250,'Services','New','Muledane','🔧',0,null],
    [uuidv4(),users[2].id,'Grade 12 Maths tutoring','One-on-one tutoring and help with past papers.',80,'Education','New','Muledane','📚',0,null],
    [uuidv4(),users[8].id,'Hair braiding service','Braiding by appointment. Contact seller for styles and availability.',180,'Beauty','New','Lwamondo','💇',0,null],
    [uuidv4(),users[3].id,'Winter jacket — size M','Pre-loved jacket in good condition.',150,'Fashion','Good','Shayandima','🧥',0,null],
    [uuidv4(),users[1].id,'Handmade bead accessories','Locally made beaded accessories. Various designs available.',70,'Fashion','New','Sibasa','📿',1,flashEnd(6)],
  ];
  listings.forEach(l=>insL.run(...l));

  db.prepare(`INSERT INTO transactions
    (id,reference,buyer_id,seller_id,listing_id,item_price,runner_fee,total,
     delivery_method,status,qr_scanned,completed_at)
    VALUES (?,?,?,?,?,35,15,50,'runner','completed',1,datetime('now','-2 hours'))`)
    .run(uuidv4(),'VL-2026-0001',users[0].id,users[1].id,listings[0][0]);

  const insN = db.prepare(`INSERT INTO notifications
    (id,user_id,type,title,body,icon,is_read,link_screen)
    VALUES (?,?,?,?,?,?,?,?)`);
  [
    ['runner_update','Runner on the way!','VendaLink Runner 1 has collected your order.','🚴',0,'transactions'],
    ['message','New message from Ndivhuwo','Is the phone still available?','💬',0,'messages'],
    ['review','New 5-star review!','Your buyer left a positive review.','⭐',1,'profile'],
    ['flash_sale','Flash sale ending soon','Fresh vegetables bundle — limited quantity.','⚡',1,'home'],
    ['verification','Community verification updated','Your community vouches have been updated.','✅',1,'profile'],
  ].forEach(([type,title,body,icon,read,screen])=>
    insN.run(uuidv4(),users[0].id,type,title,body,icon,read,screen));

  console.log(`✅ Seeded: ${users.length} fictional demo users · ${listings.length} demo listings · 5 suggested meeting areas · 4 demo runners`);
  process.exit(0);
}

seed().catch(err=>{ console.error('❌', err.message); process.exit(1); });
