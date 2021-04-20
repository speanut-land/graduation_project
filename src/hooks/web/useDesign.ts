import { useAppProviderContext } from "/@/components/Application";
export function useDesign(scope: string) {
  const values = useAppProviderContext();
  return {
    prefixCls: `${scope}`,
    prefixVar: values.prefixCls,
  };
}
