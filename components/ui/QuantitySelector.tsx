interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
}

function QuantitySelector({ onChange, quantity }: Props) {
  const updateVal = (val: any) => onChange?.(parseInt(val));

  return (
    <div class="flex items-center gap-2">
      <label class="text-gray-1 text-xs" for="quantity">Quantidade:</label>
      <select
        class="rounded-[3px] bg-gray-5 text-gray-0 text-base font-medium py-0.5 px-3 outline-none cursor-pointer"
        name="quantity"
        id="quantity"
        onChange={(e: any) => updateVal(e?.target?.value)}
        value={quantity}
      >
        <option value="0">0</option>
        <option value="1" selected>1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
      </select>
    </div>
  );
}

export default QuantitySelector;
