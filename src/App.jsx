import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform, animate } from 'framer-motion';
import { 
  Menu, X, TrendingUp, TrendingDown, Calculator, Users, Briefcase, 
  Search, ShieldCheck, ChevronDown, MapPin, Mail, Phone, ArrowRight, DollarSign, Activity
} from 'lucide-react';
import { FaWhatsapp, FaInstagram, FaGooglePlay, FaApple } from 'react-icons/fa';
import logo from './assets/logo.png';
import logo1 from './assets/logo1.png';
import logo2 from './assets/logo2.png';

const Counter = ({ from, to, prefix = "", suffix = "" }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => prefix + Math.round(latest) + suffix);

  useEffect(() => {
    const controls = animate(count, to, { duration: 2.5, delay: 0.8, ease: "easeOut" });
    return controls.stop;
  }, [count, to]);

  return <motion.span>{rounded}</motion.span>;
};

const AtendconSPA = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Barra de progresso de scroll
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const WHATSAPP_LINK = "https://api.whatsapp.com/send/?phone=5531983858280"; // WhatsApp Oficial

  const services = [
    {
      title: "Gestão Contábil",
      icon: <Calculator className="w-8 h-8 text-blue-600" />,
      desc: "Classificação, escrituração contábil e análise de demonstrações (Balanço, DRE). Entrega de SPED e E-Lalur.",
      fullDetails: [
        "Classificação e escrituração contábil",
        "Elaboração e análise das demonstrações contábeis (Balancetes mensais, DRE, Balanço Patrimonial, Fluxo de Caixa)",
        "SPED Contábil, fiscal e contribuições",
        "Declarações acessórias (DIPJ, DCTF, FCONT, E-Lalur, entre outras)",
        "PER/DCOMP – Processos de Restituição e Compensação de Tributos Federais"
      ]
    },
    {
      title: "Gestão Fiscal",
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      desc: "Apuração de tributos (ICMS, IPI, PIS, Cofins, ISSQN) e transmissão de obrigações acessórias (DCTF, Dapi, VAF).",
      fullDetails: [
        "Apuração de tributos: ISSQN, ICMS, IPI, PIS, Cofins",
        "Declaração de Débitos e Créditos Tributários Federais (DCTF)",
        "Declaração de Apuração e Informações do ICMS (Dapi)",
        "Valor Adicionado Fiscal / Declaração Anual de Movimento Econômico e Fiscal (VAF/Damef)",
        "Declaração de Substituição Tributária e Declaração Eletrônica de Serviços (DES)"
      ]
    },
    {
      title: "Departamento Pessoal",
      icon: <Users className="w-8 h-8 text-blue-600" />,
      desc: "Elaboração de folha de pagamento, cálculo de rescisões, controle de férias e envio de obrigações mensais/anuais.",
      fullDetails: [
        "Elaboração de folha de pagamento, 13º salário, pró-labore e guias (INSS, FGTS, IRRF)",
        "Registro informatizado de empregados",
        "Cálculo de rescisões e reajustes salariais (acordos ou dissídios coletivos)",
        "Mapa de Controle Anual de Férias",
        "Obrigações acessórias (Caged, Rais, Dirf) e informes de rendimentos"
      ]
    },
    {
      title: "Consultoria Tributária e Societária",
      icon: <Briefcase className="w-8 h-8 text-blue-600" />,
      desc: "Assessoria técnica, regimes especiais de tributação e treinamentos com atualizações da legislação.",
      fullDetails: [
        "Assessoria técnica específica nas áreas fiscal, trabalhista e previdenciária",
        "Elaboração e acompanhamento de Regimes Especiais de Tributação",
        "Treinamentos técnicos periódicos com atualizações da legislação",
        "Desenvolvimento de informativos e circulares para divulgação"
      ]
    },
    {
      title: "Auditoria Eletrônica (SPED)",
      icon: <Search className="w-8 h-8 text-blue-600" />,
      desc: "Validação profunda e certificação de arquivos fiscais/contábeis para reduzir riscos tributários.",
      fullDetails: [
        "Valida, audita e certifica arquivos fiscais a serem apresentados ao fisco",
        "Análises estruturais e complexos cruzamentos fiscais (100% dos dados)",
        "Redução de riscos tributários e aproveitamento de benefícios fiscais",
        "Apontamentos de erros, advertências e oportunidades"
      ]
    },
    {
      title: "Legalização e Pessoa Física",
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
      desc: "Constituição, alterações contratuais e regularização de registros. Inclui também declarações de IRPF.",
      fullDetails: [
        "Constituição de empresas e alterações contratuais",
        "Confecção de atos societários e regularização de registros necessários",
        "Pessoa Física (I.R.P.F.): Confecção e acompanhamento da Declaração de Imposto de Renda"
      ]
    }
  ];

  const faqs = [
    { q: "Como funciona a troca de contador para a Atendcon?", a: "O processo é simples e transparente. Nós cuidamos de toda a transição de documentos e dados fiscais com seu antigo contador, garantindo 100% de conformidade." },
    { q: "Vocês atendem empresas de quais portes?", a: "Atendemos desde microempreendedores até grandes empresas, adaptando nossos serviços de gestão fiscal e contábil ao grau de complexidade do seu negócio." },
    { q: "O atendimento é 100% digital?", a: "Sim, utilizamos ferramentas tecnológicas para recebimento e envio de documentos, mas mantemos um relacionamento próximo e consultivo." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white relative">
      {/* Scroll Progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50" style={{ scaleX }} />

      {/* 1. NAVBAR */}
      <header className={`fixed w-full top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/50 transition-all duration-300 ${isScrolled ? 'py-2 shadow-sm' : 'py-4'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-1">
            <img src={logo1} alt="Atendcon Icon" className="h-10 md:h-12 w-auto object-contain" />
            <img src={logo2} alt="Atendcon Text" className="h-8 md:h-10 w-auto object-contain translate-y-1" />
          </div>
          
          <nav className="hidden md:flex flex-1 justify-center gap-10 items-center font-medium text-sm text-slate-600">
            <a href="#servicos" className="hover:text-blue-600 transition-colors">Serviços</a>
            <a href="#metodo" className="hover:text-blue-600 transition-colors">Método</a>
            <a href="#sobre" className="hover:text-blue-600 transition-colors">Quem Somos</a>
            <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
            <a href="#app" className="hover:text-blue-600 transition-colors">App</a>
            <a href="#contato" className="hover:text-blue-600 transition-colors">Contato</a>
          </nav>

          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="https://vip.acessorias.com/atendconcontabilidade" target="_blank" rel="noreferrer" className="text-slate-900 hover:text-blue-600 font-bold transition-colors">
              Área do Cliente
            </a>
            <a href={`${WHATSAPP_LINK}&text=${encodeURIComponent("Olá! Gostaria de agendar uma consultoria e falar com um especialista.") + "&type=phone_number&app_absent=0"}`} target="_blank" rel="noreferrer" className="bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 font-semibold">
              Falar com Especialista
            </a>
          </div>

          <button className="md:hidden text-slate-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl flex flex-col p-6 gap-4 font-medium"
            >
              <a href="#servicos" onClick={() => setIsMobileMenuOpen(false)}>Serviços</a>
              <a href="#metodo" onClick={() => setIsMobileMenuOpen(false)}>Método</a>
              <a href="#sobre" onClick={() => setIsMobileMenuOpen(false)}>Quem Somos</a>
              <a href="#faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
              <a href="#app" onClick={() => setIsMobileMenuOpen(false)}>Nosso App</a>
              <a href="https://vip.acessorias.com/atendconcontabilidade" target="_blank" rel="noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="text-blue-600 font-bold mt-2">Área do Cliente</a>
              <a href={`${WHATSAPP_LINK}&text=${encodeURIComponent("Olá! Gostaria de agendar uma consultoria e falar com um especialista.") + "&type=phone_number&app_absent=0"}`} className="bg-blue-600 text-white text-center py-3 rounded-full mt-2">Falar com Especialista</a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center pt-28 pb-6 md:pt-20 md:pb-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" alt="Office" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/40"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div 
            initial="hidden" animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="max-w-3xl"
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-semibold text-xs md:text-sm mb-4 backdrop-blur-sm">
              Excelência e Tradição Contábil em BH
            </motion.div>
            <motion.h1 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
              Estruture o futuro do seu negócio com <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">precisão contábil.</span>
            </motion.h1>
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-base md:text-lg text-slate-300 mb-6 leading-relaxed max-w-2xl">
              Fornecemos serviços personalizados de contabilidade, gestão fiscal e consultoria empresarial. Deixe a burocracia com especialistas e foque exclusivamente no crescimento da sua empresa.
            </motion.p>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button onClick={() => setIsConsultationModalOpen(true)} className="bg-blue-600 text-white px-6 py-3.5 md:px-8 md:py-4 rounded-full font-semibold text-center hover:bg-blue-700 transition flex items-center justify-center gap-2">
                Agendar Consultoria <ArrowRight size={18} className="md:w-5 md:h-5"/>
              </button>
              <a href="#servicos" className="bg-white/10 text-white border border-white/20 px-6 py-3.5 md:px-8 md:py-4 rounded-full font-semibold text-center hover:bg-white/20 transition backdrop-blur-sm">
                Explorar Serviços
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-3 gap-2 md:gap-6 mt-8 md:mt-12"
          >
            {[
              { label: "Anos de Experiência", value: 10, prefix: "+" },
              { label: "Clientes Satisfeitos", value: 500, prefix: "+" },
              { label: "Conformidade Fiscal", value: 100, suffix: "%" }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + (i * 0.1), duration: 0.5, type: "spring" }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-md border border-white/10 p-3 md:p-6 rounded-2xl text-white cursor-default text-center sm:text-left flex flex-col justify-center"
              >
                <div className="text-xl sm:text-3xl md:text-4xl font-black text-blue-400 mb-0.5 md:mb-1">
                  <Counter from={0} to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <div className="text-[10px] sm:text-xs md:text-base text-slate-300 leading-tight">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section id="servicos" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">O Que Entregamos</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Soluções completas para lidar com qualquer grau de complexidade financeira, fiscal e trabalhista.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedService(service)}
                className="bg-slate-50 border border-slate-100 p-8 rounded-3xl cursor-pointer hover:shadow-2xl hover:shadow-blue-600/10 transition-all group"
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modal de Serviços */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-8 rounded-3xl max-w-lg w-full relative"
              >
                <button onClick={() => setSelectedService(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900"><X /></button>
                <div className="mb-6">{selectedService.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{selectedService.title}</h3>
                <p className="text-slate-600 mb-6">{selectedService.desc}</p>
                {selectedService.fullDetails && (
                  <ul className="mb-8 space-y-3 text-sm text-slate-700">
                    {selectedService.fullDetails.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-1.5 w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <a href={`${WHATSAPP_LINK}&text=${encodeURIComponent(`Olá! Acessei o site da Atendcon e gostaria de saber mais detalhes sobre o serviço de ${selectedService.title}.`) + "&type=phone_number&app_absent=0"}`} target="_blank" rel="noreferrer" className="block w-full bg-blue-600 text-white text-center py-3 rounded-full font-semibold hover:bg-blue-700">
                  Solicitar este serviço
                </a>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal de Triagem de Agendamento */}
        <AnimatePresence>
          {isConsultationModalOpen && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white p-6 md:p-8 rounded-3xl max-w-md w-full relative max-h-[90vh] overflow-y-auto custom-scrollbar"
              >
                <button onClick={() => setIsConsultationModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900"><X /></button>
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                  <FaWhatsapp size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-slate-900">Como podemos ajudar?</h3>
                <p className="text-slate-600 mb-6 text-sm">Selecione o assunto principal para direcionarmos o seu atendimento da melhor forma possível.</p>
                
                <div className="space-y-3">
                  {[
                    "Abertura de Empresa",
                    "Gestão Contábil",
                    "Gestão Fiscal",
                    "Departamento Pessoal",
                    "Legalização e Pessoa Física",
                    "Auditoria Eletrônica",
                    "Outros Assuntos"
                  ].map((option, idx) => (
                    <a 
                      key={idx}
                      href={`${WHATSAPP_LINK}&text=${encodeURIComponent(`Olá! Gostaria de agendar uma consultoria e saber mais sobre: *${option}*.`) + "&type=phone_number&app_absent=0"}`}
                      target="_blank" rel="noreferrer"
                      onClick={() => setIsConsultationModalOpen(false)}
                      className="block w-full text-left px-5 py-3.5 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 font-medium text-slate-700 transition-all flex justify-between items-center group"
                    >
                      {option}
                      <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* 4. METODO SECTION */}
      <section id="metodo" className="py-24 bg-[#020617] text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Nosso Método</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Um processo validado para trazer segurança jurídica e performance financeira para o seu negócio.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-900 via-blue-500 to-blue-900 -translate-y-1/2 opacity-30"></div>

            {[
              { step: "01", title: "Diagnóstico", desc: "Análise profunda da atual situação fiscal e contábil.", color: "from-blue-500 to-cyan-400" },
              { step: "02", title: "Compliance", desc: "Saneamento de pendências e regularização completa.", color: "from-indigo-500 to-blue-400" },
              { step: "03", title: "Planejamento", desc: "Desenho de regimes tributários e metas financeiras.", color: "from-violet-500 to-indigo-400" },
              { step: "04", title: "Performance", desc: "Acompanhamento mensal com auditoria eletrônica.", color: "from-purple-500 to-violet-400" }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl relative overflow-hidden group hover:border-slate-700 transition-all shadow-2xl"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" style={{ backgroundImage: `var(--tw-gradient-stops)` }}></div>
                
                <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${item.color} shadow-lg text-white font-black text-xl`}>
                  {item.step}
                </div>
                
                <h4 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">{item.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                
                {/* Background large number */}
                <span className="text-8xl font-black text-white/5 absolute -bottom-4 -right-4 group-hover:text-white/10 transition-colors">{item.step}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. QUEM SOMOS */}
      <section id="sobre" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80" alt="Team" className="rounded-3xl shadow-2xl object-cover h-[500px] w-full" />
            <div className="absolute -bottom-8 -right-8 bg-blue-600 text-white p-8 rounded-3xl shadow-xl hidden md:block">
              <ShieldCheck size={40} className="mb-4" />
              <div className="font-bold text-xl">Alto Padrão</div>
              <div className="text-blue-200 text-sm">Contabilidade Consultiva</div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">A atenção que sua empresa precisa</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              A ATENDCON CONTABILIDADE tem fornecido serviços personalizados de contabilidade e fiscais em Belo Horizonte. Com nossa equipe altamente treinada, sempre em busca de novos conhecimentos, estamos prontos para lidar com todas as suas necessidades de contabilidade, seja qual for o grau de complexidade. Caso precise de ajuda com as suas finanças pessoais ou da sua empresa, estamos sempre prontos para fazer seu planejamento fiscal ou prestar assessoria.
            </p>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Construímos uma excelente reputação cuidando das necessidades fiscais e contábeis de uma grande variedade de empresas e pessoas. Temos toda a informação disponível e queremos trabalhar com você.
            </p>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-2">Serviço Personalizado, Resultados Mensuráveis</h4>
                <p className="text-slate-600 text-sm">Entregar segurança jurídica e financeira através de uma contabilidade consultiva, permitindo que você foque no que faz de melhor: o seu negócio.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section id="faq" className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-blue-600/5 clip-path-slant z-0"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-xs mb-6 w-fit">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              Tire suas dúvidas
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-6 leading-tight">
              Perguntas <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Frequentes</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Ainda tem dúvidas sobre como a Atendcon pode revolucionar a gestão da sua empresa?
            </p>
            <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                  <Users size={24} />
                </div>
                <h4 className="font-bold text-slate-900 mb-2 text-xl">Precisa de ajuda humana?</h4>
                <p className="text-sm text-slate-500 mb-6">Nossa equipe de especialistas está pronta para analisar o seu caso específico.</p>
                <a href={`${WHATSAPP_LINK}&text=${encodeURIComponent("Olá! Estou no site e tenho algumas dúvidas específicas.")}&type=phone_number&app_absent=0`} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg">
                  <FaWhatsapp size={18}/> Chamar no WhatsApp
                </a>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-8 space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className={`bg-white border ${activeFaq === i ? 'border-blue-500 shadow-lg shadow-blue-100' : 'border-slate-200 hover:border-blue-300'} rounded-2xl overflow-hidden transition-all duration-300`}>
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <span className={`font-bold text-lg ${activeFaq === i ? 'text-blue-700' : 'text-slate-800'}`}>{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${activeFaq === i ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    <ChevronDown className={`transform transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} size={18} />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-slate-600 leading-relaxed"
                    >
                      <div className="pt-2 border-t border-slate-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. NOSSO APP SECTION */}
      <section id="app" className="py-24 bg-blue-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 -left-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-[100px]"></div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.8 }}
            className="order-2 lg:order-1 flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Phone Mockup Frame */}
              <div className="relative w-[280px] h-[580px] bg-slate-900 rounded-[3rem] border-[8px] border-slate-900 shadow-2xl flex items-center justify-center overflow-hidden">
                {/* Screen Content - Financial Dashboard Mockup */}
                <div className="w-full h-full bg-slate-50 flex flex-col relative text-slate-900 overflow-hidden">
                  {/* Status Bar */}
                  <div className="absolute top-0 w-full h-7 bg-transparent z-20 flex justify-between px-6 py-2">
                    <div className="w-4 h-4 bg-slate-900 rounded-full absolute top-1.5 left-1/2 -translate-x-1/2"></div>
                  </div>
                  {/* Header Profile */}
                  <div className="bg-blue-600 pt-10 pb-16 px-5 flex flex-col text-white rounded-b-[2rem] shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <div className="w-10 h-10 bg-white rounded-xl p-1.5 shadow-sm">
                        <img src={logo1} alt="Icon" className="w-full h-full object-contain" />
                      </div>
                      <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm"><Activity size={16} /></div>
                    </div>
                    <p className="text-xs text-blue-100 mb-1">Saldo em Caixa</p>
                    <h3 className="font-black text-2xl">R$ 142.500,00</h3>
                  </div>
                  
                  {/* Dashboard Widgets */}
                  <div className="flex-1 px-5 -mt-8 space-y-4 overflow-y-auto custom-scrollbar pb-6">
                    {/* Receitas e Despesas */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
                          <TrendingUp size={14} />
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium mb-0.5">Receitas</p>
                        <p className="text-sm font-bold text-slate-800">R$ 85.2k</p>
                      </div>
                      <div className="bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                        <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-2">
                          <TrendingDown size={14} />
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium mb-0.5">Despesas</p>
                        <p className="text-sm font-bold text-slate-800">R$ 32.4k</p>
                      </div>
                    </div>

                    {/* Impostos a Pagar */}
                    <div className="bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-xs font-bold text-slate-800">Próximos Vencimentos</h4>
                        <span className="text-[10px] text-blue-600 font-bold">Ver todos</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center text-orange-500">
                              <DollarSign size={14} />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-800">DAS - Simples</p>
                              <p className="text-[9px] text-slate-400">Vence em 2 dias</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-slate-800">R$ 1.250,00</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
                              <Briefcase size={14} />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-800">GPS / INSS</p>
                              <p className="text-[9px] text-slate-400">Vence hoje</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-slate-800">R$ 840,00</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Badges Inside Phone */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}
                    className="absolute bottom-4 left-4 right-4 bg-white p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 border border-slate-100 z-30"
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0"><ShieldCheck size={16} /></div>
                    <div>
                      <div className="text-[10px] text-slate-500 font-medium">Conformidade</div>
                      <div className="font-bold text-slate-900 text-xs">100% Segura</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-bold text-sm mb-6">
              O Seu Escritório Digital
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
              A contabilidade da sua empresa na <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">palma da mão.</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Com o aplicativo oficial da ATENDCON, você acompanha suas finanças, acessa guias de impostos, envia documentos e fala com seu contador em tempo real. Tudo isso direto do seu celular, de forma rápida, segura e sem burocracia.
            </p>

            <ul className="space-y-4 mb-10">
              {['Envio e recebimento de documentos fiscais', 'Acesso rápido a guias e relatórios', 'Atendimento direto com seu contador', 'Notificações importantes de vencimentos'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <ShieldCheck size={14} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4 mt-6">
              <a href="#" className="flex items-center gap-3 bg-black hover:bg-slate-900 hover:scale-105 border border-slate-800 px-4 py-2.5 rounded-xl transition-all text-white shadow-lg w-fit">
                <FaGooglePlay size={24} className="text-white" />
                <div className="text-left">
                  <div className="text-[9px] leading-none text-slate-300 mb-0.5">DISPONÍVEL NO</div>
                  <div className="text-sm font-semibold leading-tight">Google Play</div>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 bg-black hover:bg-slate-900 hover:scale-105 border border-slate-800 px-4 py-2.5 rounded-xl transition-all text-white shadow-lg w-fit">
                <FaApple size={28} className="text-white" />
                <div className="text-left">
                  <div className="text-[9px] leading-none text-slate-300 mb-0.5">Baixar na</div>
                  <div className="text-sm font-semibold leading-tight">App Store</div>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8. CONTATO E MAPA */}
      <section id="contato" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-bold text-sm mb-4">
              Atendimento Rápido
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-4">Fale Conosco</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Explique brevemente a sua necessidade. Nossa equipe entrará em contato em instantes via WhatsApp para oferecer a melhor solução para o seu negócio.
            </p>

            <form className="space-y-5" onSubmit={(e) => {
              e.preventDefault();
              const nome = e.target.nome.value;
              const empresa = e.target.empresa.value;
              const servico = e.target.servico.value;
              const mensagem = e.target.mensagem.value;
              const texto = `Olá! Meu nome é *${nome}*${empresa ? ` da empresa *${empresa}*` : ''}.\n\nGostaria de falar sobre: *${servico}*.\n\nDetalhes:\n${mensagem}`;
              window.open(`${WHATSAPP_LINK}&text=${encodeURIComponent(texto)}&type=phone_number&app_absent=0`);
            }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Seu Nome *</label>
                  <input name="nome" type="text" placeholder="Como podemos te chamar?" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Empresa</label>
                  <input name="empresa" type="text" placeholder="Nome do seu negócio" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Qual sua necessidade principal? *</label>
                <select name="servico" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-slate-700" required>
                  <option value="" disabled selected>Selecione uma opção...</option>
                  <option value="Abertura de Empresa">Quero abrir uma empresa</option>
                  <option value="Troca de Contador">Quero trocar de contador</option>
                  <option value="Consultoria Tributária">Preciso reduzir meus impostos</option>
                  <option value="Regularização">Preciso regularizar pendências</option>
                  <option value="Outros">Outros assuntos</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Detalhes da sua solicitação</label>
                <textarea name="mensagem" rows={4} placeholder="Conte um pouco mais sobre o que você precisa..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all custom-scrollbar"></textarea>
              </div>
              <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl py-4 transition-colors flex items-center justify-center gap-2 text-lg shadow-lg shadow-green-500/30">
                <FaWhatsapp size={24} />
                Enviar pelo WhatsApp
              </button>
            </form>
          </div>

          <div className="relative h-full w-full min-h-[500px] lg:min-h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white isolate bg-slate-100 group">
            {/* Map Frame */}
            <iframe 
              src="https://maps.google.com/maps?q=Avenida%20Cristiano%20Machado%20640%20sala%201507%20Sagrada%20Familia%20Belo%20Horizonte&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              className="absolute inset-0 grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
            
            {/* Floating Glass Contact Card over the map */}
            <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-8 md:bottom-8 md:w-80 bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/50 shadow-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Sede Atendcon</h4>
                  <p className="text-xs text-blue-600 font-bold">Belo Horizonte - MG</p>
                </div>
              </div>
              <div className="space-y-3 text-sm text-slate-600">
                <p className="flex gap-3 leading-relaxed">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></span>
                  Avenida Cristiano Machado 640, Sala 1507<br/>Sagrada Familia - CEP 31030-514
                </p>
                <div className="h-px w-full bg-slate-200"></div>
                <p className="flex items-center gap-3 font-medium text-slate-800">
                  <FaWhatsapp size={16} className="text-green-500" /> (31) 98385-8280
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 9. CTA FINAL */}
      <section className="py-24 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80')] opacity-10 object-cover bg-center mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Transforme a contabilidade em Vantagem Competitiva.</h2>
          <p className="text-xl text-blue-100 mb-10">Agende uma conversa e descubra como podemos alavancar o seu negócio.</p>
          <a href={`${WHATSAPP_LINK}&text=${encodeURIComponent("Olá! Gostaria de iniciar meu diagnóstico gratuito e transformar a contabilidade da minha empresa.") + "&type=phone_number&app_absent=0"}`} target="_blank" rel="noreferrer" className="inline-block bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-50 transition shadow-2xl">
            Iniciar Diagnóstico Gratuito
          </a>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-[#020617] text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-1 mb-6">
              <img src={logo1} alt="Atendcon Icon" className="h-10 md:h-12 w-auto object-contain" />
              <img src={logo2} alt="Atendcon Text" className="h-8 md:h-10 w-auto object-contain translate-y-1" />
            </div>
            <p className="text-sm">Atenção que sua empresa precisa. Especialistas em gestão fiscal, contábil e departamento pessoal em Belo Horizonte.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Contato</h4>
            <div className="space-y-4 text-sm">
              <p className="flex items-center gap-3"><MapPin size={18} className="text-blue-500 flex-shrink-0" /> Avenida Cristiano Machado 640 sala 1507<br/>Sagrada Familia - BH- CEP 31030-514</p>
              <p className="flex items-center gap-3"><FaWhatsapp size={18} className="text-blue-500 flex-shrink-0" /> (31) 98385-8280</p>
              <p className="flex items-center gap-3"><Phone size={18} className="text-blue-500 flex-shrink-0" /> (31) 97500-4001</p>
              <p className="flex items-center gap-3"><Mail size={18} className="text-blue-500 flex-shrink-0" /> Comercial@atendcon.com.br</p>
              <p className="flex items-center gap-3"><Mail size={18} className="text-blue-500 flex-shrink-0" /> Operacional@atendcon.com.br</p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="https://www.instagram.com/atendconcontabilidade?utm_source=qr" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white rounded-full hover:scale-110 transition-all shadow-lg hover:shadow-pink-500/50 shrink-0">
                <FaInstagram size={20} />
              </a>
              <div className="h-8 w-px bg-slate-800 hidden sm:block"></div>
              <a href="#" className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-blue-500 hover:scale-105 border-0 px-3 py-1.5 rounded-xl transition-all text-white shadow-lg hover:shadow-blue-500/50 shrink-0">
                <FaGooglePlay size={16} className="text-white" />
                <div className="text-left">
                  <div className="text-[9px] leading-none text-emerald-100">Disponível no</div>
                  <div className="text-xs font-bold leading-tight">Google Play</div>
                </div>
              </a>
              <a href="#" className="flex items-center gap-2 bg-gradient-to-r from-slate-700 to-slate-900 hover:scale-105 border-0 px-3 py-1.5 rounded-xl transition-all text-white shadow-lg hover:shadow-slate-500/50 shrink-0">
                <FaApple size={20} className="text-white" />
                <div className="text-left">
                  <div className="text-[9px] leading-none text-slate-300">Baixar na</div>
                  <div className="text-xs font-bold leading-tight">App Store</div>
                </div>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Links Rápidos</h4>
            <div className="flex flex-col gap-3 text-sm">
              <a href="https://vip.acessorias.com/atendconcontabilidade" target="_blank" rel="noreferrer" className="text-blue-400 font-bold hover:text-white transition">Área do Cliente</a>
              <a href="#servicos" className="hover:text-white transition">Serviços</a>
              <a href="#metodo" className="hover:text-white transition">Nosso Método</a>
              <a href="#sobre" className="hover:text-white transition">Quem Somos</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} ATENDCON CONTABILIDADE. Todos os direitos reservados.</p>
          <p className="mt-2 md:mt-0 text-slate-500">CNPJ: 12.345.678/0001-90</p>
        </div>
      </footer>

      {/* 10. FLOATING WHATSAPP */}
      <a 
        href={`${WHATSAPP_LINK}&text=${encodeURIComponent("Olá! Gostaria de tirar algumas dúvidas.") + "&type=phone_number&app_absent=0"}`} 
        target="_blank" rel="noreferrer"
        className={`fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center ${isScrolled ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'}`}
      >
        <FaWhatsapp size={32} />
      </a>
    </div>
  );
};

export default AtendconSPA;
