"use client";

import { Loader } from "@/components/ui/loader";
import { useAppSelector, useAppDispatch, setLoading } from "@/store";
import { PropsWithChildren, useEffect } from "react";

export const LoadingProvider = function ({ children }: PropsWithChildren) {
  const { isLoading } = useAppSelector((slice) => slice.Loading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(false));
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="w-full h-screen bg-background flex justify-center items-center">
        <Loader variant="paired-revolution" />
      </div>
    );
  }

  return <>{children}</>;
};
