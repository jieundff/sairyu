import { useState } from "react";
import { LOGIN_COPY } from "@/shop/data/copy";
import { PageTitle } from "@/shop/components/layout/PageTitle";
import { ShopButton } from "@/shop/components/form/ShopButton";
import { SocialLoginButton } from "@/shop/components/form/SocialLoginButton";
import { TextField } from "@/shop/components/form/TextField";

interface LoginScreenProps {
  onSubmit: (id: string, password: string) => void;
  onLink: (id: (typeof LOGIN_COPY.links)[number]["id"]) => void;
  onSocial: (provider: "kakao" | "naver") => void;
}

/** 로그인 페이지 — credentials, helper links, then the two social buttons. */
export function LoginScreen({ onSubmit, onLink, onSocial }: LoginScreenProps) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <PageTitle>{LOGIN_COPY.title}</PageTitle>

      <form
        className="shop-login"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(id, password);
        }}
      >
        <TextField
          label={LOGIN_COPY.idLabel}
          value={id}
          autoComplete="username"
          onChange={(event) => setId(event.target.value)}
        />
        <TextField
          label={LOGIN_COPY.passwordLabel}
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={(event) => setPassword(event.target.value)}
        />

        <ShopButton
          className="shop-login__submit"
          type="submit"
          size="md"
          fullWidth
        >
          {LOGIN_COPY.submit}
        </ShopButton>

        <div className="shop-login__links">
          {LOGIN_COPY.links.map((link) => (
            <button
              key={link.id}
              type="button"
              className="shop-login__link"
              onClick={() => onLink(link.id)}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="shop-login__social">
          <SocialLoginButton provider="kakao" onClick={() => onSocial("kakao")} />
          <SocialLoginButton provider="naver" onClick={() => onSocial("naver")} />
        </div>
      </form>
    </>
  );
}
