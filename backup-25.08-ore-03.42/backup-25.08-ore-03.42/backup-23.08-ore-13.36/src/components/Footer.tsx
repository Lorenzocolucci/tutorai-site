export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-10">
      <div className="container grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="font-bold text-lg">TutorAI</div>
          <p className="text-slate-600 mt-2">Il tutor che si adatta alla tua mente.</p>
        </div>
        <div>
          <div className="font-semibold">Prodotto</div>
          <ul className="mt-2 space-y-2 text-slate-600">
            <li><a href="#features">Features</a></li>
            <li><a href="#curricula">Curricula</a></li>
            <li><a href="#pricing">Pricing</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold">Supporto</div>
          <ul className="mt-2 space-y-2 text-slate-600">
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#">Contatti</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold">Legale</div>
          <ul className="mt-2 space-y-2 text-slate-600">
            <li><a href="/legal">Termini</a></li>
            <li><a href="/privacy">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div className="container text-xs text-slate-500 mt-6">© {new Date().getFullYear()} TutorAI. All rights reserved.</div>
    </footer>
  )
}
