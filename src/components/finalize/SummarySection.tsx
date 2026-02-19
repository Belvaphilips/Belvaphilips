interface SummarySectionProps {
  productType: string;
  shotCount: number;
  onUpgrade: () => void;
}

export default function SummarySection({
  productType,
  shotCount,
  onUpgrade,
}: SummarySectionProps) {
  return (
    <div>
      <div className="bg-[#F0F0F0] border-[0.5px] border-[#1D1D1B] p-5 mb-4">
        <h3 className="font-bold mb-4 text-[20px] leading-[155%] text-[#1D1D1B]">
          SUMMARY
        </h3>
        <div className="flex justify-between mb-2 font-semibold border-b-[0.5px] border-[#D1D1D1] pb-2">
          <span className="text-[#1D1D1B]">Product</span>
          <span className="capitalize text-[#1D1D1B]">
            {productType.toLowerCase()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#1D1D1B] font-semibold">Shots:</span>
          <span className="text-[#787878]">
            Portfolio Shot{shotCount > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div
        className="py-[7px] border-[0.5px] border-[#1D1D1B] pl-3 md:pr-5 pr-3"
        style={{
          background:
            "linear-gradient(to right, #FFFFFF 30%, #E7E7E7 85%, #DEDEDE 100%)",
        }}
      >
        <div className="flex justify-between items-center w-full gap-3 md:gap-0">
          <span className="font-semibold text-[#1D1D1B] text-sm md:text-base">
            Upgrade your membership in order to save up to 25%!
          </span>
          <button
            onClick={onUpgrade}
            className="bg-black cursor-pointer text-white md:h-[38px] h-[32px] md:w-[106px] px-3 md:px-0 flex items-center justify-center text-sm font-semibold uppercase rounded-full"
          >
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
}
