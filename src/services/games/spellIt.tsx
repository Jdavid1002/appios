import GeneralService from '../general/general';

class SpellItGameService {
  private questions: any[] = [
    {question: 'Pa_iente', options: ['c', 's', 'z'], answer: 'c'},
    {question: 'A_ul', options: ['z', 's', 'x'], answer: 'z'},
    {question: 'Fle_ible', options: ['x', 'c'], answer: 'x'},
    {question: 'Bri_ante', options: ['ll', 'y'], answer: 'll'},
    {question: '_inco', options: ['C', 'S', 'Z'], answer: 'C'},
    {question: 'Inteli_ente', options: ['g', 'j'], answer: 'g'},
    {question: 'Urugua_o', options: ['y', 'll'], answer: 'y'},
    {question: 'Ma_or', options: ['y', 'll'], answer: 'y'},
    {question: '_erde', options: ['B', 'V'], answer: 'V'},
    {question: 'Feli_', options: ['z', 's'], answer: 'z'},
    {question: 'So_noliento', options: ['n', 'm'], answer: 'm'},
    {question: '_eneroso', options: ['G', 'J'], answer: 'G'},
    {question: 'Pere_oso', options: ['z', 's'], answer: 'z'},
    {question: 'So_iable', options: ['c', 's'], answer: 'c'},
    {question: '_erio', options: ['S', 'C'], answer: 'S'},
    {question: 'O_eja', options: ['v', 'b'], answer: 'v'},
    {question: 'Pacien_ia', options: ['c', 's', 'z'], answer: 'c'},
    {question: 'Nie_e', options: ['v', 'b'], answer: 'v'},
    {question: 'A_úcar', options: ['z', 's'], answer: 'z'},
    {question: '_auría', options: ['J', 'G'], answer: 'J'},
    {question: 'Quesi_o', options: ['ll', 'y'], answer: 'll'},
    {question: 'Limpia_idrios', options: ['v', 'b'], answer: 'v'},
    {question: 'Ca_e', options: ['ll', 'y'], answer: 'll'},
    {question: 'Me_a', options: ['s', 'z'], answer: 's'},
    {question: 'Me_cla', options: ['z', 's'], answer: 'z'},
    {question: '_umo', options: ['Z', 'S'], answer: 'Z'},
    {question: '_urado', options: ['J', 'G'], answer: 'J'},
    {question: 'Pue_lo', options: ['b', 'v'], answer: 'b'},
    {question: '_iudad', options: ['C', 'S'], answer: 'C'},
    {question: 'Ca_ra', options: ['b', 'v'], answer: 'b'},
    {question: 'Cora_ón', options: ['z', 's'], answer: 'z'},
    {question: 'Lengua_e', options: ['j', 'g'], answer: 'j'},
    {question: 'Nari_', options: ['z', 's'], answer: 'z'},
    {question: 'Ofi_ina', options: ['c', 's'], answer: 'c'},
    {question: 'O_éano', options: ['c', 's'], answer: 'c'},
    {question: 'Hom_re', options: ['b', 'v'], answer: 'b'},
    {question: '_ida', options: ['V', 'B'], answer: 'V'},
    {question: 'Ol_idar', options: ['v', 'b'], answer: 'v'},
    {question: 'Ob_eto', options: ['j', 'g'], answer: 'j'},
    {question: 'Ob_eción', options: ['j', 'g'], answer: 'j'},
    {question: '_anda', options: ['B', 'V'], answer: 'B'},
    {question: 'Per_ona', options: ['s', 'c'], answer: 's'},
    {question: 'Cla_e', options: ['s', 'c'], answer: 's'},
    {question: 'Espa_ol', options: ['ñ', 'y'], answer: 'ñ'},
    {question: 'U_a', options: ['ñ', 'y'], answer: 'ñ'},
    {question: 'E_ento', options: ['v', 'b'], answer: 'v'},
    {question: '_ielo', options: ['H', 'O'], answer: 'H'},
    {question: 'Na_ión', options: ['c', 's'], answer: 'c'},
    {question: 'Ni_el', options: ['v', 'b'], answer: 'v'},
    {question: 'Le_', options: ['y', 'i'], answer: 'y'},
    {question: 'Ni_a', options: ['ñ', 'y'], answer: 'ñ'},
    {question: '_idrio', options: ['V', 'B'], answer: 'V'},
    {question: '_aso', options: ['V', 'B'], answer: 'V'},
    {question: 'Nu_lado', options: ['v', 'b'], answer: 'b'},
    {question: '_urdo', options: ['Z', 'S'], answer: 'Z'},
    {question: 'Intro_ertido', options: ['v', 'b'], answer: 'v'},
    {question: 'So_erbio', options: ['v', 'b'], answer: 'b'},
    {question: 'Esta_ilidad', options: ['v', 'b'], answer: 'b'},
    {question: 'Gro_ero', options: ['s', 'c'], answer: 's'},
    {question: 'Le_e', options: ['v', 'b'], answer: 'v'},
    {question: 'Repul_ivo', options: ['s', 'c'], answer: 's'},
    {question: 'Sua_e', options: ['v', 'b'], answer: 'v'},
    {question: '_eneno', options: ['V', 'B'], answer: 'V'},
    {question: '_aliente', options: ['V', 'B'], answer: 'V'},
    {question: '_entaja', options: ['V', 'B'], answer: 'V'},
    {question: 'E_terno', options: ['x', 's'], answer: 'x'},
    {question: 'E_treno', options: ['s', 'x'], answer: 's'},
    {question: 'So_rio', options: ['b', 'v'], answer: 'b'},
    {question: 'I_norante', options: ['g', 'j'], answer: 'g'},
    {question: '_illa', options: ['S', 'C'], answer: 'S'},
    {question: 'Pá_ina', options: ['g', 'j'], answer: 'g'},
    {question: 'Pro_lema', options: ['b', 'v'], answer: 'b'},
    {question: 'Vi_a', options: ['ll', 'y'], answer: 'd'},
    {question: 'Mu_er', options: ['j', 'g'], answer: 'j'},
    {question: 'Zooló_ico', options: ['g', 'j'], answer: 'g'},
    {question: 'Via_e', options: ['j', 'g'], answer: 'j'},
    {question: 'Creen_ia', options: ['c', 's'], answer: 'c'},
    {question: 'Confian_a', options: ['z', 's'], answer: 'z'},
    {question: 'Cono_imiento', options: ['c', 's'], answer: 'c'},
    {question: 'Pla_a', options: ['y', 'll'], answer: 'y'},
    {question: 'Li_ertad', options: ['b', 'v'], answer: 'b'},
    {question: '_ardín', options: ['J', 'G'], answer: 'J'},
    {question: '_estido', options: ['V', 'B'], answer: 'V'},
    {question: 'O_o', options: ['j', 'g'], answer: 'j'},
    {question: 'Pin_el', options: ['c', 's'], answer: 'c'},
    {question: 'L_ones', options: ['e', 'i'], answer: 'e'},
    {question: 'Esco_er', options: ['g', 'j'], answer: 'g'},
    {question: '_emana', options: ['S', 'C'], answer: 'S'},
    {question: 'Belle_a', options: ['z', 's'], answer: 'z'},
    {question: 'Bos_ue', options: ['q', 'k'], answer: 'q'},
    {question: 'Par_ue', options: ['q', 'k'], answer: 'q'},
    {question: '_eñor', options: ['S', 'C'], answer: 'S'},
    {question: '_onduras', options: ['H', 'O'], answer: 'H'},
    {question: 'Li_reta', options: ['b', 'v'], answer: 'b'},
    {question: 'Re_año', options: ['b', 'v'], answer: 'b'},
    {question: '_añera', options: ['B', 'V'], answer: 'B'},
    {question: 'Enjam_re', options: ['b', 'v'], answer: 'b'},
    {question: 'Ca_erío', options: ['s', 'c'], answer: 's'},
    {question: '_osque', options: ['B', 'V'], answer: 'B'},
    {question: '_ereal', options: ['C', 'S'], answer: 'C'},
    {question: 'Noti_ia', options: ['c', 's'], answer: 'c'},
    {question: 'Bi_cocho', options: ['z', 's'], answer: 'z'},
    {question: '_ien', options: ['C', 'S'], answer: 'C'},
    {question: 'Maí_', options: ['z', 's'], answer: 'z'},
    {question: 'U_a', options: ['v', 'b'], answer: 'v'},
    {question: 'Pi_a', options: ['ñ', 'n'], answer: 'ñ'},
    {question: 'Lápi_', options: ['z', 's'], answer: 'z'},
    {question: 'Va_illa', options: ['j', 'g'], answer: 'j'},
    {question: 'Tripula_ión', options: ['c', 's'], answer: 'c'},
    {question: '_énero', options: ['G', 'J'], answer: 'G'},
    {question: '_erdo', options: ['C', 'S'], answer: 'C'},
    {question: '_irafa', options: ['J', 'G'], answer: 'J'},
    {question: 'A_ión', options: ['v', 'b'], answer: 'v'},
    {question: '_arco', options: ['V', 'B'], answer: 'B'},
    {question: 'E_pleo', options: ['m', 'n'], answer: 'm'},
    {question: 'E_bajada', options: ['m', 'n'], answer: 'm'},
    {question: 'Bri_ar', options: ['ll', 'y'], answer: 'll'},
    {question: '_amasá', options: ['Y', 'LL'], answer: 'Y'},
    {question: 'Bu_ón', options: ['z', 's'], answer: 'z'},
    {question: 'A_parar', options: ['m', 'n'], answer: 'm'},
    {question: '_epillo', options: ['C', 'S'], answer: 'C'},
    {question: 'Cla_el', options: ['v', 'b'], answer: 'v'},
    {question: 'Bur_uja', options: ['v', 'b'], answer: 'b'},
    {question: 'Ca_ello', options: ['v', 'b'], answer: 'b'},
    {question: 'Bre_e', options: ['v', 'b'], answer: 'v'},
    {question: 'Ca_ero', options: ['j', 'g'], answer: 'j'},
    {question: 'Bra_o', options: ['v', 'b'], answer: 'v'},
    {question: 'Bote_a', options: ['ll', 'y'], answer: 'll'},
    {question: 'Casti_o', options: ['ll', 'y'], answer: 'll'},
    {question: 'Prin_esa', options: ['c', 's'], answer: 'c'},
    {question: 'Ani_o', options: ['ll', 'y'], answer: 'll'},
    {question: 'La_andería', options: ['v', 'b'], answer: 'n'},
    {question: '_andeja', options: ['B', 'V'], answer: 'B'},
    {question: '_ocadillo', options: ['B', 'V'], answer: 'B'},
    {question: 'Bom_a', options: ['v', 'b'], answer: 'b'},
    {question: 'Bom_ero', options: ['v', 'b'], answer: 'b'},
    {question: 'Bom_illo', options: ['v', 'b'], answer: 'b'},
    {question: '_alance', options: ['B', 'V'], answer: 'B'},
    {question: 'Nego_io', options: ['s', 'c'], answer: 'c'},
    {question: 'Dis_iplina', options: ['s', 'c'], answer: 'c'},
    {question: 'En_iclopedia', options: ['s', 'c'], answer: 'c'},
    {question: 'De_eo', options: ['s', 'c'], answer: 's'},
    {question: 'Recono_er', options: ['s', 'c'], answer: 'c'},
    {question: 'Á_il', options: ['j', 'g'], answer: 'g'},
    {question: 'A_ia', options: ['s', 'c'], answer: 's'},
    {question: 'Automó_il', options: ['v', 'b'], answer: 'v'},
    {question: 'Edifi_io', options: ['s', 'c'], answer: 'c'},
    {question: 'A_domen', options: ['t', 'b'], answer: 'b'},
    {question: 'Abra_o', options: ['z', 's'], answer: 'z'},
    {question: 'Adi_ión', options: ['s', 'cc'], answer: 'cc'},
    {question: 'Ah_rrar', options: ['u', 'o'], answer: 'o'},
    {question: 'Ahu_entar', options: ['y', 'll'], answer: 'y'},
    {question: 'Alaban_a', options: ['z', 's'], answer: 'z'},
    {question: 'Ajedre_', options: ['s', 'z'], answer: 'z'},
    {question: 'Alco_ol', options: ['h', 'o'], answer: 'h'},
    {question: 'Alfa_etizar', options: ['b', 'v'], answer: 'b'},
    {question: 'Alm_hada', options: ['o', 'a'], answer: 'o'},
    {question: 'Ama_ónico', options: ['z', 's'], answer: 'z'},
    {question: 'Amne_ia', options: ['s', 'c'], answer: 's'},
    {question: 'An_elar', options: ['h', 'o'], answer: 'h'},
    {question: 'Apro_ar', options: ['b', 'v'], answer: 'b'},
    {question: 'Be_er', options: ['b', 'v'], answer: 'b'},
    {question: 'Benefi_io', options: ['c', 's'], answer: 'c'},
    {question: 'Bue_', options: ['y', 'll'], answer: 'y'},
    {question: 'Boli_ia', options: ['v', 'b'], answer: 'v'},
    {question: 'A_stralia', options: ['u', 'o'], answer: 'u'},
    {question: 'Bí_eps', options: ['c', 's'], answer: 'c'},
    {question: 'Bo_eto', options: ['c', 's'], answer: 'c'},
    {question: 'Burgue_ía', options: ['s', 'c'], answer: 's'},
    {question: 'Aterri_aje', options: ['z', 's'], answer: 'z'},
    {question: 'A_estruz', options: ['v', 'b'], answer: 'v'},
    {question: 'A_ulejo', options: ['z', 's'], answer: 'z'},
    {question: 'Beneficio_o', options: ['s', 'c'], answer: 's'},
    {question: 'Bauti_o', options: ['z', 's'], answer: 'z'},
    {question: 'Apa_iguar', options: ['c', 's'], answer: 'c'},
    {question: 'Arro_a', options: ['v', 'b'], answer: 'b'},
    {question: '_estia', options: ['B', 'V'], answer: 'B'},
    {question: 'Beren_ena', options: ['j', 'g'], answer: 'j'},
    {question: 'Bombi_a', options: ['ll', 'y'], answer: 'll'},
    {question: 'Bara_a', options: ['j', 'g'], answer: 'j'},
    {question: 'Audien_ia', options: ['c', 's'], answer: 'c'},
    {question: '_írculo', options: ['C', 'S'], answer: 'C'},
    {question: 'Cora_e', options: ['j', 'g'], answer: 'j'},
    {question: 'Co_ote', options: ['y', 'll'], answer: 'y'},
    {question: '_iclo', options: ['C', 'S'], answer: 'C'},
    {question: 'De_da', options: ['u', 'o'], answer: 'u'},
    {question: 'Esfuer_o', options: ['z', 's'], answer: 'z'},
    {question: 'Pronun_ia', options: ['c', 's'], answer: 'c'},
    {question: 'E_celente', options: ['x', 's'], answer: 'x'},
    {question: 'F_ustrado', options: ['r', 'rr'], answer: 'r'},
    {question: 'Fu_sia', options: ['c', 's'], answer: 'c'},
    {question: '_isterna', options: ['C', 'S'], answer: 'C'},
    {question: 'E_tensión', options: ['x', 's'], answer: 'x'},
    {question: 'Re_', options: ['y', 'll'], answer: 'y'},
    {question: 'Re_na', options: ['i', 'y'], answer: 'i'},
    {question: '_ayonesa', options: ['N', 'M'], answer: 'M'},
    {question: 'Imagina_ión', options: ['c', 's'], answer: 'c'},
    {question: '_ilófono', options: ['X', 'S'], answer: 'X'},
    {question: 'Pi_cina', options: ['s', 'c'], answer: 's'},
    {question: '_ondad', options: ['B', 'V'], answer: 'B'},
    {question: 'Dis_ípulo', options: ['s', 'c'], answer: 'c'},
    {question: 'Mur_iélago', options: ['s', 'c'], answer: 'c'},
    {question: 'Ex_esivo', options: ['s', 'c'], answer: 'c'},
    {question: 'O_jeto', options: ['v', 'b'], answer: 'b'},
    {question: 'Alti_ajo', options: ['v', 'b'], answer: 'b'},
    {question: 'Adec_ado', options: ['u', 'o'], answer: 'u'},
    {question: 'Planifica_ión', options: ['s', 'c'], answer: 'c'},
    {question: 'Li_re', options: ['v', 'b'], answer: 'b'},
    {question: 'Organi_ado', options: ['s', 'z'], answer: 'z'},
    {question: 'Pro_eder', options: ['s', 'c'], answer: 'c'},
    {question: '_oleto', options: ['B', 'V'], answer: 'B'},
    {question: 'A_biente', options: ['n', 'm'], answer: 'm'},
    {question: 'Su_erir', options: ['j', 'g'], answer: 'g'},
    {question: 'Coti_ar', options: ['s', 'z'], answer: 'z'},
    {question: 'Espe_ial', options: ['s', 'c'], answer: 'c'},
    {question: 'Prín_ipe', options: ['s', 'c'], answer: 'c'},
    {question: 'Prin_ipal', options: ['s', 'c'], answer: 'c'},
    {question: '_enso', options: ['S', 'C'], answer: 'C'},
    {question: 'Per_istencia', options: ['s', 'c'], answer: 'c'},
    {question: 'Adoles_entes', options: ['s', 'c'], answer: 'c'},
    {question: 'Na_iones', options: ['s', 'c'], answer: 'c'},
    {question: 'Organi_ar', options: ['s', 'z'], answer: 'z'},
    {question: 'Organiza_ión', options: ['s', 'c'], answer: 'c'},
    {question: 'Propor_ión', options: ['s', 'c'], answer: 'c'},
    {question: 'Pare_er', options: ['s', 'c'], answer: 'c'},
    {question: 'Tam_ién', options: ['v', 'b'], answer: 'b'},
    {question: 'I_plícito', options: ['n', 'm'], answer: 'm'},
    {question: 'Estrate_ia', options: ['g', 'j'], answer: 'g'},
    {question: 'So_iales', options: ['c', 's'], answer: 'c'},
    {question: 'Delincuen_ia', options: ['s', 'c'], answer: 'c'},
    {question: 'In_idencia', options: ['s', 'c'], answer: 'c'},
    {question: 'Poten_ia', options: ['s', 'c'], answer: 'c'},
    {question: 'Informa_ión', options: ['s', 'c'], answer: 'c'},
    {question: 'Comunica_ión', options: ['s', 'c'], answer: 'c'},
    {question: 'Desfa_orable', options: ['v', 'b'], answer: 'v'},
    {question: 'Por_entaje', options: ['s', 'c'], answer: 'c'},
    {question: '_entaja', options: ['V', 'B'], answer: 'V'},
    {question: 'Educa_ión', options: ['s', 'c'], answer: 'c'},
    {question: '_isión', options: ['V', 'B'], answer: 'V'},
    {question: 'Lidera_go', options: ['s', 'z'], answer: 'z'},
    {question: '_entral', options: ['S', 'C'], answer: 'C'},
    {question: 'Re_iente', options: ['s', 'c'], answer: 'c'},
    {question: 'Consecuen_ia', options: ['s', 'c'], answer: 'c'},
    {question: 'Ini_io', options: ['s', 'c'], answer: 'c'},
    {question: 'Reten_ión', options: ['s', 'c'], answer: 'c'},
    {question: 'Go_ierno', options: ['v', 'b'], answer: 'b'},
    {question: 'Ma_a', options: ['ll', 'y'], answer: 'y'},
    {question: 'A_teca', options: ['s', 'z'], answer: 'z'},
    {question: 'I_ca', options: ['n', 'm'], answer: 'n'},
    {question: 'Ter_ero', options: ['s', 'c'], answer: 'c'},
    {question: '_egundo', options: ['S', 'C'], answer: 'S'},
    {question: 'A_ignado', options: ['s', 'c'], answer: 's'},
    {question: 'Re_istro', options: ['g', 'j'], answer: 'g'},
    {question: 'Ini_ial', options: ['s', 'c'], answer: 'c'},
    {question: 'Défi_it', options: ['s', 'c'], answer: 'c'},
    {question: 'Pla_o', options: ['s', 'z'], answer: 'z'},
    {question: 'E_plicar', options: ['s', 'x'], answer: 'x'},
    {question: 'Tradu_ir', options: ['s', 'c'], answer: 'c'},
    {question: '_iudadano', options: ['S', 'C'], answer: 'C'},
    {question: 'E_e', options: ['j', 'g'], answer: 'j'},
    {question: 'Ob_etivo', options: ['j', 'g'], answer: 'j'},
    {question: 'Di_ersidad', options: ['v', 'b'], answer: 'v'},
    {question: '_ector', options: ['C', 'S'], answer: 'S'},
    {question: 'A_plio', options: ['n', 'm'], answer: 'm'},
    {question: 'I_cluir', options: ['n', 'm'], answer: 'n'},
    {question: 'Constru_ión', options: ['x', 'cc'], answer: 'cc'},
    {question: 'Inten_ión', options: ['s', 'c'], answer: 'c'},
    {question: 'Orienta_ión', options: ['s', 'c'], answer: 'c'},
    {question: 'Experien_ia', options: ['s', 'c'], answer: 'c'},
    {question: 'Aprendi_aje', options: ['z', 's'], answer: 'z'},
    {question: 'Colo_bia', options: ['n', 'm'], answer: 'm'},
    {question: 'O_o', options: ['g', 'j'], answer: 'j'},
    {question: 'Estre_a', options: ['ll', 'y'], answer: 'll'},
    {question: 'Tra_ajo', options: ['v', 'b'], answer: 'b'},
    {question: 'Noti_ia', options: ['s', 'c'], answer: 'c'},
    {question: 'Contra_eña', options: ['s', 'c'], answer: 's'},
    {question: 'Dema_iado', options: ['s', 'c'], answer: 's'},
    {question: 'Genera_ión', options: ['s', 'c'], answer: 'c'},
    {question: 'Qui_ás', options: ['z', 's'], answer: 'z'},
    {question: 'Ju_tos', options: ['n', 'm'], answer: 'n'},
    {question: 'I_cendio', options: ['n', 'm'], answer: 'n'},
    {question: 'Ha_er', options: ['s', 'c'], answer: 'c'},
    {question: '_uelo', options: ['V', 'B'], answer: 'V'},
    {question: '_eguro', options: ['S', 'C'], answer: 'S'},
    {question: 'A_er', options: ['y', 'll'], answer: 'y'},
    {question: 'Calaba_a', options: ['z', 's'], answer: 'z'},
    {question: 'Di_ersión', options: ['v', 'b'], answer: 'v'},
    {question: 'Pa_ión', options: ['s', 'c'], answer: 's'},
    {question: 'Se_illa', options: ['m', 'n'], answer: 'm'},
    {question: 'E_presa', options: ['n', 'm'], answer: 'm'},
    {question: 'Edifi_io', options: ['s', 'c'], answer: 'c'},
    {question: 'Ba_co', options: ['n', 'm'], answer: 'n'},
    {question: 'Relo_', options: ['t', 'j'], answer: 'j'},
    {question: 'Moto_icleta', options: ['s', 'c'], answer: 'c'},
    {question: 'Calida_', options: ['t', 'd'], answer: 'd'},
    {question: 'A_rigo', options: ['v', 'b'], answer: 'b'},
    {question: 'Ele_ir', options: ['g', 'j'], answer: 'g'},
    {question: '_urro', options: ['B', 'V'], answer: 'B'},
    {question: 'Responsa_ilidad', options: ['b', 'v'], answer: 'b'},
    {question: '_iolín', options: ['V', 'B'], answer: 'V'},
    {question: 'Ha_er', options: ['s', 'c'], answer: 'c'},
    {question: 'Prue_a', options: ['v', 'b'], answer: 'b'},
    {question: '_ena', options: ['S', 'C'], answer: 'C'},
    {question: 'Sa_tiago', options: ['m', 'n'], answer: 'n'},
    {question: 'A_bulancia', options: ['n', 'm'], answer: 'm'},
    {question: 'Helicó_tero', options: ['t', 'p'], answer: 'p'},
    {question: 'Mur_iélago', options: ['s', 'c'], answer: 'c'},
    {question: 'Man_ana', options: ['s', 'z'], answer: 'z'},
    {question: '_anahoria', options: ['S', 'Z'], answer: 'Z'},
    {question: '_afacón', options: ['S', 'Z'], answer: 'Z'},
    {question: 'Lapi_ero', options: ['s', 'c'], answer: 'c'},
    {question: 'Lá_para', options: ['n', 'm'], answer: 'm'},
    {question: 'Va_ío', options: ['s', 'c'], answer: 'c'},
    {question: '_arado', options: ['V', 'B'], answer: 'V'},
    {question: '_irafa', options: ['G', 'J'], answer: 'J'},
    {question: '_allena', options: ['B', 'V'], answer: 'B'},
    {question: 'Alu_no', options: ['n', 'm'], answer: 'm'},
    {question: 'Co_prensión', options: ['n', 'm'], answer: 'm'},
    {question: 'Análi_is', options: ['s', 'c'], answer: 's'},
  ];

  public generate = () => {
    return GeneralService.shuffle(this.questions);
  };
}

export default SpellItGameService;
