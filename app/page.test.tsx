import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Home from "./page";
const React = require("react");

// app/page.test.tsx

// Mock next/image to just render an img
jest.mock("next/image", () => (props: any) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img {...props} alt={props.alt} />
));

// Mock next/link to just render children
jest.mock("next/link", () => ({ children, href }: any) => <a href={href}>{children}</a>);

// Mock framer-motion to just render children
jest.mock("framer-motion", () => {
  return {
    motion: new Proxy(
      {},
      {
        get: (target, prop) => (props: any) => <div {...props}>{props.children}</div>,
      }
    ),
  };
});

// Mock custom components
jest.mock("@/Components/Sections/Gallery", () => () => <div data-testid="gallery" />);
jest.mock("@/Components/HoverText", () => ({ label, url }: any) => (
  <a href={url} data-testid="hover-text">
    {label}
  </a>
));
jest.mock("@/Components/InvertHover", () => ({ active }: any) =>
  active ? <div data-testid="invert-hover-active" /> : <div data-testid="invert-hover" />
);

// Mock content data
jest.mock("@/app/content/content", () => ({
  contactInfo: {
    name: "Test Name",
    email: "test@example.com",
    phone: "123-456-7890",
    location: "Test City",
    socialMedia: {
      instagram: "https://instagram.com/test",
      facebook: "https://facebook.com/test",
    },
  },
  services: {
    portrait: { title: "Portrait" },
    event: { title: "Event" },
    lifestyle: { title: "Lifestyle" },
  },
}));

describe("Home page", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders hero section with correct text", () => {
    render(<Home />);
    expect(screen.getByText(/koys/i)).toBeInTheDocument();
    expect(screen.getByText(/Photography/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Friendly and skilled photographer/i)
    ).toBeInTheDocument();
  });

  it("renders gallery section", () => {
    render(<Home />);
    expect(screen.getByText(/Selected Works/i)).toBeInTheDocument();
    expect(screen.getByTestId("gallery")).toBeInTheDocument();
  });

  it("renders services section with all services", () => {
    render(<Home />);
    expect(screen.getByText(/Services/i)).toBeInTheDocument();
    expect(screen.getByText(/— Portrait —/i)).toBeInTheDocument();
    expect(screen.getByText(/— Event —/i)).toBeInTheDocument();
    expect(screen.getByText(/— Lifestyle —/i)).toBeInTheDocument();
  });

  it("shows invert hover on mouse enter/leave", () => {
    render(<Home />);
    const service = screen.getByText(/— Portrait —/i).closest("div");
    expect(screen.getAllByTestId("invert-hover")[0]).toBeInTheDocument();
    if (service) {
      fireEvent.mouseEnter(service);
      expect(screen.getAllByTestId("invert-hover-active")[0]).toBeInTheDocument();
      fireEvent.mouseLeave(service);
      expect(screen.getAllByTestId("invert-hover")[0]).toBeInTheDocument();
    }
  });

  it("renders contact section with info and social links", () => {
    render(<Home />);
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Name/)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/)).toBeInTheDocument();
    expect(screen.getByText(/123-456-7890/)).toBeInTheDocument();
    expect(screen.getByText(/Test City/)).toBeInTheDocument();
    expect(screen.getByText(/Instagram/)).toBeInTheDocument();
    expect(screen.getByText(/Facebook/)).toBeInTheDocument();
  });

  it("carousel changes images over time", () => {
    render(<Home />);
    // There are 4 images, only one should have opacity 1 at a time
    const imgs = screen.getAllByRole("img");
    expect(imgs.length).toBe(4);
    // First image visible
    expect(imgs[0].style.opacity).toBe("1");
    expect(imgs[1].style.opacity).toBe("0");
    // Advance timer by 3500ms
    act(() => {
      jest.advanceTimersByTime(3500);
    });
    // Second image visible
    expect(imgs[1].style.opacity).toBe("1");
    expect(imgs[0].style.opacity).toBe("0");
  });

  it("wipe overlay disappears after 1200ms", () => {
    render(<Home />);
    // Wipe overlay present initially
    expect(screen.getAllByText((content, element) =>
      element?.className?.includes("bg-black")
    ).length).toBeGreaterThan(0);
    // Advance timer by 1200ms
    act(() => {
      jest.advanceTimersByTime(1200);
    });
    // Wipe overlay should be gone
    expect(
      screen.queryAllByText((content, element) =>
        element?.className?.includes("bg-black")
      ).length
    ).toBe(0);
  });
});