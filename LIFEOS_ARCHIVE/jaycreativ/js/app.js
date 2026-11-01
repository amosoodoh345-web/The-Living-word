document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  const toast = document.querySelector('.toast');
  const showToast = message => { toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2600); };
  const saved = localStorage.getItem('selah-journal');
  const entry = document.querySelector('#journalEntry'); if (saved) entry.value = saved;
  document.querySelector('#saveJournal').addEventListener('click', () => { if (!entry.value.trim()) return showToast('Write a few words first.'); localStorage.setItem('selah-journal', entry.value); document.querySelector('#saveState').textContent = 'Saved just now'; showToast('Your reflection has been saved.'); });
  document.querySelectorAll('.prompt-card').forEach(card => card.addEventListener('click', () => { entry.value = card.dataset.prompt + '\n\n' + entry.value; document.querySelector('#journalTitle').textContent = card.querySelector('strong').textContent + ' reflection'; entry.focus(); entry.scrollIntoView({behavior:'smooth', block:'center'}); }));
  const save = document.querySelector('.save-verse'); save.addEventListener('click', () => { save.classList.toggle('saved'); save.innerHTML = save.classList.contains('saved') ? '<i data-lucide="bookmark-check"></i>' : '<i data-lucide="bookmark"></i>'; lucide.createIcons(); showToast(save.classList.contains('saved') ? 'Verse saved to your collection.' : 'Verse removed.'); });
  const encouragements = ['You don’t have to carry tomorrow today. Grace meets you right where you are.','The same God who holds the stars is holding every detail of your life.','Your small step of faith matters. Keep walking—He is with you.']; let word = 0;
  document.querySelector('#newEncouragement').addEventListener('click', () => { word = (word + 1) % encouragements.length; document.querySelector('#encouragementText').textContent = encouragements[word]; showToast('A fresh word for your heart.'); });
  const studies = [{title:'Finding peace in the waiting',text:'When answers feel distant, God is still near. Let’s look at what it means to trust Him in the in-between.'},{title:'Strength for today',text:'God gives daily bread for the road ahead. Today, receive what you need for this moment.'}]; let study = 0;
  document.querySelector('#nextStudy').addEventListener('click', () => { study=(study+1)%studies.length; document.querySelector('#studyTitle').textContent=studies[study].title; document.querySelector('#studyText').textContent=studies[study].text; showToast('New passage ready.'); });
  document.querySelector('#startStudy').addEventListener('click', () => showToast('Study session started — take your time.'));
  document.querySelector('.menu-button').addEventListener('click', () => document.querySelector('.sidebar').classList.toggle('open'));
  document.querySelectorAll('.nav-item').forEach(link => link.addEventListener('click', () => { document.querySelectorAll('.nav-item').forEach(x=>x.classList.remove('active')); link.classList.add('active'); document.querySelector('.sidebar').classList.remove('open'); }));
});
