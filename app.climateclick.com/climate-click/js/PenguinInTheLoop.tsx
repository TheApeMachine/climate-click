import { useEffect, useState } from "react";
import { useStyletron } from "styletron-react";
import { Button } from "./components/Button";
import { Logo } from "./Logo";

interface Product {
  id: string;
  name: string;
  taxonomy: string;
  imageUrl: string;
  url: string;
  currency?: string;
  unitPriceInCents?: number;
}

const fetchRandomProduct = async () => {
  const API_URL = `https://api.climateclick.com`;
  const response = await fetch(`${API_URL}/p17p/GetRandomProduct`);
  if (!response.ok) {
    return undefined;
  }

  const data = await response.json();
  return data;
};

const fetchValidRandomProduct = async (): Promise<{
  Id: string;
  DocumentName: string;
  Taxonomy: string;
  ImageUrls: string[];
  Url: string;
  Name: string;
  Currency?: string;
  UnitPriceInCents?: number;
}> => {
  try {
    const product = await fetchRandomProduct();
    if (product && product.Taxonomy && product.ImageUrls?.length > 0) {
      return product;
    }

    return fetchValidRandomProduct();
  } catch (e) {
    return fetchValidRandomProduct();
  }
};

export const PenguinInTheLoop = () => {
  const [css] = useStyletron();
  const [product, setProduct] = useState<Product>();
  const [nextProduct, setNextProduct] = useState<Product>();
  const [shouldShowUsageDescription, setShouldShowUsageDescription] =
    useState<boolean>(true);

  const loadRandomProduct = async () => {
    try {
      if (nextProduct) {
        setProduct(nextProduct);
        setNextProduct(undefined);
      } else {
        setProduct(undefined);

        const data = await fetchValidRandomProduct();

        setProduct({
          id: data.DocumentName || data.Id,
          name: data.Name,
          taxonomy: data.Taxonomy,
          imageUrl: data.ImageUrls?.[0],
          url: data.Url,
          currency: data.Currency,
          unitPriceInCents: data.UnitPriceInCents,
        });
      }

      const nextData = await fetchValidRandomProduct();
      setNextProduct({
        id: nextData.DocumentName || nextData.Id,
        name: nextData.Name,
        taxonomy: nextData.Taxonomy,
        imageUrl: nextData.ImageUrls?.[0],
        url: nextData.Url,
        currency: nextData.Currency,
        unitPriceInCents: nextData.UnitPriceInCents,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadRandomProduct();
  }, []);

  const onRight = async () => {
    setShouldShowUsageDescription(false);

    const API_URL = `https://api.climateclick.com`;
    const response = await fetch(
      `${API_URL}/p17p/RateProductTaxonomy?id=${product!.id}&score=true`,
      {
        method: `PUT`,
      }
    );

    if (response.ok) {
      loadRandomProduct();
    }
  };

  const onWrong = async () => {
    setShouldShowUsageDescription(false);

    const API_URL = `https://api.climateclick.com`;
    const response = await fetch(
      `${API_URL}/p17p/RateProductTaxonomy?id=${product!.id}&score=false`,
      {
        method: `PUT`,
      }
    );

    if (response.ok) {
      loadRandomProduct();
    }
  };

  const onDontKnow = () => {
    loadRandomProduct();
  };

  const onImageError = () => {
    console.log(`IMAGE ERROR'ED`);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={css({ margin: `auto`, maxWidth: `600px` })}>
      <div
        className={css({
          margin: `10px`,
          textAlign: `center`,
          color: `#1A2E76`,
          "@media (max-width: 768px)": {
            display: "none",
          },
        })}
      >
        <Logo />
      </div>

      <a
        href={product.url}
        target="_blank"
        className={css({ textDecoration: `none` })}
        rel="noreferrer"
      >
        <div
          className={css({
            borderRadius: `16px`,
            overflow: `hidden`,
            margin: `10px auto 0px auto`,
            textAlign: `center`,
            height: `200px`,
            width: `auto`,
            "@media (min-width: 1024px)": {
              height: `300px`,
              width: `auto`,
            },
          })}
        >
          <img
            onError={onImageError}
            className={css({
              borderRadius: `16px`,
              margin: `auto`,
              height: `100%`,
            })}
            src={product.imageUrl}
          />
        </div>
        <h2
          className={css({
            fontSize: `16px`,
            textAlign: `center`,
            margin: `10px auto 0px auto`,
            color: `#000`,
            textDecoration: `none`,
            "@media (min-width: 1024px)": {
              height: `24px`,
            },
          })}
        >
          {product.name}
          {product.currency && product.unitPriceInCents && (
            <span>
              {" "}
              (
              {new Intl.NumberFormat(navigator.language, {
                style: `currency`,
                currency: product.currency,
                currencyDisplay: `symbol`,
              }).format(product!.unitPriceInCents / 100)}
              )
            </span>
          )}
        </h2>
      </a>
      <h2
        className={css({
          fontSize: `20px`,
          textAlign: `center`,
          margin: `20px auto 0px auto`,
          "@media (min-width: 1024px)": {
            height: `36px`,
          },
        })}
      >
        {product.taxonomy}
      </h2>

      {shouldShowUsageDescription && (
        <p
          className={css({
            textAlign: `center`,
            color: `#999`,
            margin: `10px auto 0px auto`,
            lineHeight: `18px`,
            fontSize: `14px`,
            maxWidth: `300px`,
            "@media (min-width: 1024px)": {
              lineHeight: `24px`,
              fontSize: `16px`,
            },
          })}
        >
          Does the shown product belong to the category? By answering you help
          Climate Click improve their product.
        </p>
      )}

      <div
        className={css({
          display: `flex`,
          gap: `20px`,
          justifyContent: `center`,
          marginTop: `50px`,
        })}
      >
        <Button $type="primary" onClick={onRight}>
          Right
        </Button>
        <Button $type="primary" onClick={onWrong}>
          Wrong
        </Button>
      </div>
      <button
        onClick={onDontKnow}
        className={css({
          display: `block`,
          border: 0,
          background: 0,
          color: `#737373`,
          fontSize: `14px`,
          margin: `auto`,
          textAlign: `center`,
          cursor: `pointer`,
          marginTop: `10px`,
          ":hover": {
            textDecoration: `underline`,
          },
          "@media (min-width: 1024px)": {
            fontSize: `18px`,
          },
        })}
      >
        I don't know
      </button>
    </div>
  );
};
