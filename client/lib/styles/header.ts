export const MENU_STYLES = {
  items: "origin-top-right absolute right-0 mt-3 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] bg-[#0e0e11]/95 backdrop-blur-3xl border border-white/10 focus:outline-none py-1.5 overflow-hidden",
  item: "flex items-center px-2 py-2 text-[13px] font-medium rounded-xl transition-all gap-3 w-full cursor-pointer",
  itemActive: "bg-white/5 text-primary",
  itemInactive: "text-stone-400",
  itemDanger: "bg-red-500/10 text-red-500",
  itemDangerInactive: "text-red-500/60",
  icon: "h-4 w-4 transition-colors",
  iconActive: "text-primary",
  iconInactive: "text-stone-500",
  separator: "h-px bg-white/5 my-1.5 mx-3",
  header: "px-4 py-2 border-b border-white/5 mb-1 bg-white/[0.02]",
  headerLabel: "text-[10px] text-stone-500 font-bold uppercase tracking-widest mb-1",
  headerValue: "text-[13px] font-semibold text-white/90 truncate",
};

export const DROPDOWN_TRANSITION = {
  enter: "transition ease-out duration-150",
  enterFrom: "transform opacity-0 scale-98 translate-y-1",
  enterTo: "transform opacity-100 scale-100 translate-y-0",
  leave: "transition ease-in duration-100",
  leaveFrom: "transform opacity-100 scale-100 translate-y-0",
  leaveTo: "transform opacity-0 scale-98 translate-y-1",
};

export const CARD_STYLES = {
  base: "group relative bg-[#0e0e11] border border-white/10 md:border-white/[0.04] rounded-3xl p-4 hover:bg-[#121215] hover:border-primary/20 transition-all duration-500 cursor-pointer overflow-hidden hover:shadow-[0_0_40px_rgba(212,175,53,0.03)]",
  header: "flex justify-between items-center mb-5 relative z-20",
  title: "text-xl font-medium text-white/90 group-hover:text-white transition-colors duration-300",
};
