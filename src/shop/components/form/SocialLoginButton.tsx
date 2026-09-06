import { LOGIN_COPY } from "@/shop/data/copy";
import { cn } from "@/utils/classNames";

type SocialProvider = "kakao" | "naver";

interface SocialLoginButtonProps {
  provider: SocialProvider;
  onClick: () => void;
  className?: string;
}

/**
 * Kakao / Naver sign-in. The brand marks are not in the repo, so each badge
 * renders the provider's initial on its brand colour at the 33×33 box the
 * design uses; drop a real logo in and only the badge markup changes.
 */
const PROVIDERS: Record<SocialProvider, { label: string; initial: string }> = {
  kakao: { label: LOGIN_COPY.kakao, initial: "K" },
  naver: { label: LOGIN_COPY.naver, initial: "N" },
};

export function SocialLoginButton({
  provider,
  onClick,
  className,
}: SocialLoginButtonProps) {
  const { label, initial } = PROVIDERS[provider];

  return (
    <button
      type="button"
      className={cn("shop-social", `shop-social--${provider}`, className)}
      onClick={onClick}
    >
      <span className="shop-social__badge" aria-hidden="true">
        {initial}
      </span>
      <span>{label}</span>
    </button>
  );
}
