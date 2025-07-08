import Searchbar, {
  Props as SearchbarProps,
} from "../../components/search/Searchbar.tsx";

export interface Props {
  searchbar?: SearchbarProps;
}

function SearchbarModal({ searchbar }: Props) {
  return searchbar
    ? (
      <div loading="lazy">
        <Searchbar {...searchbar} />
      </div>
    )
    : null;
}

export default SearchbarModal;
