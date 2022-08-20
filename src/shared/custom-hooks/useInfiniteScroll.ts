import { useEffect, useReducer, useCallback, RefObject } from "react";
import debounce from "lodash/debounce";
import Dogs from "../services/apis/dogs.api";

const INTERSECTION_THRESHOLD = 5;
const LOAD_DELAY_MS = 500;

interface iState {
  loading: boolean,
  currentPage: number,
  data: Array<string>
}

interface Action {
  type: string,
  payload: any
}

interface iUseInfiniteScrollArgs {
  triggerRef: RefObject<HTMLDivElement>,
  fullList: Array<string>,
  options?: any
}

const reducer = (state: iState, action: Action) => {
  switch (action.type) {
    case "set": {
      return {
        ...state,
        ...action.payload
      };
    }
    case "onGrabData": {
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.payload.data],
        currentPage: state.currentPage + 1
      };
    }
    default:
      return state;
  }
};

const useInfiniteScroll = ({ triggerRef, fullList, options } : iUseInfiniteScrollArgs) => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    currentPage: 1,
    data: []
  });

  const _handleEntry = async (entry: IntersectionObserverEntry) => {
    const boundingRect = entry.boundingClientRect;
    const intersectionRect = entry.intersectionRect;

    if (
      !state.loading &&
      entry.isIntersecting &&
      intersectionRect.bottom - boundingRect.bottom <= INTERSECTION_THRESHOLD
    ) {
      dispatch({ type: "set", payload: { loading: true } });
      const data: Array<string> = await Dogs.getSome({ page: state.currentPage, limit: 20 }, fullList);
      if(data && data.length) { 
        dispatch({ type: "onGrabData", payload: { data } });
      } else {
        dispatch({ type: "set", payload: { loading: false } });
      }
    }
  };
  
  const handleEntry = debounce(_handleEntry, LOAD_DELAY_MS);

  const onIntersect = useCallback(
    (entries: Array<IntersectionObserverEntry>) => {
      handleEntry(entries[0]);
    },
    [handleEntry]
  );

  useEffect(() => {
    if (triggerRef.current) {
      const container = triggerRef.current;
      const observer = new IntersectionObserver(onIntersect, options);

      observer.observe(container);

      return () => {
        observer.disconnect();
      };
    }
  }, [triggerRef, onIntersect, options]);

  return state;
};

export default useInfiniteScroll;