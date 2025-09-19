import { MenuItem } from "../types/menu";

import cafeMocaImage from "../../assets/menu_images/cafemoca.png";
import chamomileTeaImage from "../../assets/menu_images/Chamomile_tea.png";
import peachTeaImage from "../../assets/menu_images/peach_tea.png";
import peppermintTeaImage from "../../assets/menu_images/peppermint_tea.png";
import kiwiJuiceImage from "../../assets/menu_images/kiwi_juice.png";
import grapefruitAdeImage from "../../assets/menu_images/grapefruit_ade.png";
import mangoAdeImage from "../../assets/menu_images/mango_ade.png";
import basicWaffleImage from "../../assets/menu_images/basic_wafle.png";
import cookieWaffleImage from "../../assets/menu_images/cookie_wafle.png";
import creamRollcakeImage from "../../assets/menu_images/cream_rollcake.png";

// 메뉴 데이터 (이미지 파일명을 기반으로 구성)
export const menuItems: MenuItem[] = [
  // 커피
  {
    id: "cafe_moca",
    name: "카페모카",
    nameEn: "Cafe Mocha",
    category: "coffee",
    price: 4500,
    image: cafeMocaImage,
    description: "진한 에스프레소와 초콜릿, 우유가 만나 만든 달콤한 커피",
    descriptionEn:
      "Rich espresso combined with chocolate and milk for a sweet coffee experience",
    isAvailable: true,
    temperature: "hot",
    size: "medium",
    calories: 250,
  },

  // 차류
  {
    id: "chamomile_tea",
    name: "캐모마일 차",
    nameEn: "Chamomile Tea",
    category: "tea",
    price: 3500,
    image: chamomileTeaImage,
    description: "진정 효과가 있는 부드러운 허브 차",
    descriptionEn: "Soothing herbal tea with calming effects",
    isAvailable: true,
    temperature: "hot",
    size: "medium",
    calories: 5,
  },
  {
    id: "peach_tea",
    name: "복숭아 차",
    nameEn: "Peach Tea",
    category: "tea",
    price: 4000,
    image: peachTeaImage,
    description: "달콤한 복숭아 향이 가득한 차",
    descriptionEn: "Sweet and fragrant peach-flavored tea",
    isAvailable: true,
    temperature: "both",
    size: "medium",
    calories: 80,
  },
  {
    id: "peppermint_tea",
    name: "페퍼민트 차",
    nameEn: "Peppermint Tea",
    category: "tea",
    price: 3500,
    image: peppermintTeaImage,
    description: "상쾌한 민트 향의 허브 차",
    descriptionEn: "Refreshing mint-flavored herbal tea",
    isAvailable: true,
    temperature: "hot",
    size: "medium",
    calories: 5,
  },

  // 주스류
  {
    id: "kiwi_juice",
    name: "키위 주스",
    nameEn: "Kiwi Juice",
    category: "juice",
    price: 5000,
    image: kiwiJuiceImage,
    description: "신선한 키위로 만든 비타민이 풍부한 주스",
    descriptionEn: "Fresh kiwi juice rich in vitamins",
    isAvailable: true,
    temperature: "cold",
    size: "medium",
    calories: 120,
  },

  // 에이드류
  {
    id: "grapefruit_ade",
    name: "자몽 에이드",
    nameEn: "Grapefruit Ade",
    category: "ade",
    price: 4500,
    image: grapefruitAdeImage,
    description: "상큼한 자몽으로 만든 시원한 에이드",
    descriptionEn: "Refreshing grapefruit ade with tangy flavor",
    isAvailable: true,
    temperature: "cold",
    size: "medium",
    calories: 150,
  },
  {
    id: "mango_ade",
    name: "망고 에이드",
    nameEn: "Mango Ade",
    category: "ade",
    price: 4500,
    image: mangoAdeImage,
    description: "달콤한 망고로 만든 트로피컬 에이드",
    descriptionEn: "Sweet tropical mango ade",
    isAvailable: true,
    temperature: "cold",
    size: "medium",
    calories: 180,
  },

  // 디저트
  {
    id: "basic_waffle",
    name: "기본 와플",
    nameEn: "Basic Waffle",
    category: "dessert",
    price: 6000,
    image: basicWaffleImage,
    description: "바삭하고 부드러운 기본 와플",
    descriptionEn: "Crispy and soft basic waffle",
    isAvailable: true,
    temperature: "hot",
    size: "medium",
    calories: 350,
    allergens: ["gluten", "eggs", "dairy"],
  },
  {
    id: "cookie_waffle",
    name: "쿠키 와플",
    nameEn: "Cookie Waffle",
    category: "dessert",
    price: 7000,
    image: cookieWaffleImage,
    description: "쿠키가 들어간 특별한 와플",
    descriptionEn: "Special waffle with cookie pieces",
    isAvailable: true,
    temperature: "hot",
    size: "medium",
    calories: 420,
    allergens: ["gluten", "eggs", "dairy"],
  },
  {
    id: "cream_rollcake",
    name: "크림 롤케이크",
    nameEn: "Cream Roll Cake",
    category: "dessert",
    price: 5500,
    image: creamRollcakeImage,
    description: "부드러운 크림이 가득한 롤케이크",
    descriptionEn: "Soft roll cake filled with creamy filling",
    isAvailable: true,
    temperature: "cold",
    size: "medium",
    calories: 280,
    allergens: ["gluten", "eggs", "dairy"],
  },
];

// 카테고리별 메뉴 필터링 함수
export const getMenuByCategory = (category: string) => {
  return menuItems.filter((item) => item.category === category);
};

// 사용 가능한 메뉴만 필터링
export const getAvailableMenu = () => {
  return menuItems.filter((item) => item.isAvailable);
};

// 메뉴 검색 함수 (이름으로 검색)
export const searchMenu = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.nameEn.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery),
  );
};
