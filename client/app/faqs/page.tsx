export default function Home() {
  return (
    <div className="flex flex-col gap-3 m-5">
      <div className="text-2xl font-bold text-[#800080] hover:text-[#9400D3] active:text-[#4B0082] from-35% to-[#000000]">
        Mates Raffle
      </div>

      <div className="text-sm">
        They really do. Per{" "}
        <a
          href="https://en.wikipedia.org/wiki/Lottery"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#800080] hover:text-[#9400D3] active:text-[#4B0082] from-35% to-[#000000]"
        >
          wikipedia
        </a>
        , the first lottery/raffle system we have record of in human history are
        some keno slips from the Chinese Han dynasty between 205 and 187 BC.
        Humans love a punt, and they seemingly always have.
      </div>

      <div className="text-sm">
        The thing about lotteries, raffles and gambling that gets us going is
        the <i>&apos;Well, what if I did win?&apos;</i> cost analysis type
        thinking that comes with them, something that is only fair to think when
        a raffle with valuable prizes is conducted fairly - fairly meaning that
        no cheating is possible to pick winners in advance.
      </div>

      <div className="text-sm">
        matesraffle.com aims to provide a good looking web app that allows for
        creation and management of raffle systems that source their randomness
        from public computers, that anyone can verify. matesraffle.com does this
        by utilising Verifiably Random numbers from Chainlink, Pyth Network and
        Chronicle, 3 separate oracle providers.
      </div>

      <div className="text-sm">
        An oracle in computing refers to accessing non-computer generated
        information. Computers are excellent at either doing nothings (0s) or
        doing somethings (1s), so, how can they generate random things?
      </div>

      <div className="text-sm">
        The short answer is, they kind of can&apos;t, so consulting an external
        source of randomness is often useful to guarantee randomness. For
        example, Cloudflare does this by using{" "}
        <a
          href="https://www.cloudflare.com/learning/ssl/lava-lamp-encryption/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#800080] hover:text-[#9400D3] active:text-[#4B0082] from-35% to-[#000000]"
        >
          100 Lava Lamps
        </a>
        , then reading the randomness that comes off such a set up and using
        that for their random input values.
      </div>

      <div className="text-sm">
        By getting 3 separate oracle providers we get 3 completely random
        sources of information, this would mean that in order for someone to
        cheat this system, they would need to have control of all 3 oracle
        providers. This is tricky, but not impossible, I think we can add more
        fairness guarantees.
      </div>

      <div className="text-2xl font-bold text-[#800080] hover:text-[#9400D3] active:text-[#4B0082] from-35% to-[#000000]">
        Hash Functions
      </div>

      <div className="text-sm">
        A hash function or a trap-door function is something that sends
        information one way, with no way to return to the previous place it was.
      </div>
    </div>
  );
}
