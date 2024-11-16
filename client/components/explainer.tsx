"use client";

import { motion } from "framer-motion";

import HashFunction, { MultipleHashes } from "@/components/hash-function";

const Explainer = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          They really do.{" "}
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          Per{" "}
          <a
            href="https://en.wikipedia.org/wiki/Lottery"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#800080] hover:text-[#9400D3] active:text-[#4B0082] from-35% to-[#000000]"
          >
            wikipedia
          </a>
          , the first lottery/raffle system we have record of in human history
          are some keno slips from the Chinese Han dynasty between 205 and 187
          BC. Humans love a punt, and they seemingly always have.
        </motion.span>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="flex flex-col gap-2"
      >
        <div className="text-sm">
          The thing about lotteries, raffles and gambling that gets us going is
          the <i>&apos;Well, what if I did win?&apos;</i> cost analysis type
          thinking that comes with them, something that is only fair to think
          when a raffle with valuable prizes is conducted fairly - fairly
          meaning that no cheating is possible to pick winners in advance.
        </div>

        <div className="text-sm">
          matesraffle.com aims to provide a good looking web app that allows for
          creation and management of raffle systems that source their randomness
          from public computers, that anyone can verify. matesraffle.com does
          this by utilising Verifiably Random numbers from Chainlink, Pyth
          Network and Chronicle, 3 separate oracle providers.
        </div>

        <div className="text-sm">
          An oracle in computing refers to accessing non-computer generated
          information. Computers are excellent at either doing nothings (0s) or
          doing somethings (1s), so, how can they generate random things?
        </div>

        <div className="text-sm">
          The short answer is, they kind of can&apos;t, so consulting an
          external source of randomness is often useful to guarantee randomness.
          For example, Cloudflare does this by using{" "}
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
          information one way, with no way to return to the previous place it
          was.
        </div>

        <HashFunction />

        <div className="text-sm">
          A good hash function is collision resistant, meaning that for a unique
          given input (i), you should always get a unique given output (o).
        </div>

        <MultipleHashes />

        <div className="text-sm">
          Because of these properties, when given the output of a hash function,
          it can be used as a commitment to a given input, without yet revealing
          anything about the input itself.
        </div>
        <div className="text-sm">
          matesraffle.com utilises these properties to by committing to a
          locally generated value when a raffle is created. We call this our
          &apos;Raffle Secret&apos;, and we call the hashed output of our Raffle
          Secret our &apos;Raffle ID&apos;, and we can share this with anyone.
        </div>

        <div className="mt-4 text-2xl font-bold text-[#800080] hover:text-[#9400D3] active:text-[#4B0082] from-35% to-[#000000]">
          Achieving Verifiable Randomness
        </div>

        <div className="text-sm">
          You might of already seen this coming, but, we achieve randomness by
          creating a value by hashing:
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>All VRF values from our oracle providers</li>
            <li>Our Raffle ID (which is public)</li>
            <li>Our Raffle Secret (which we reveal at the time of drawing)</li>
          </ul>
        </div>

        <div className="text-sm">
          This holds as trustless and fair, as:
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>
              If the Oracle Providers plan to collude, they do not know our
              Raffle Secret that will be hashed with their dishonest inputs.
            </li>
            <li>
              If the raffle organiser wants to cheat, they have to find a hash
              collision of 5 separate input fields, as they are still bound by
              hash function properties.
            </li>
          </ul>
        </div>
        <div className="text-sm">
          Both of these statements should hold true with the hash function being
          used, mainly because of the{" "}
          <a
            href="https://en.wikipedia.org/wiki/Discrete_logarithm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#800080] hover:text-[#9400D3] active:text-[#4B0082] underline"
          >
            discrete log hard
          </a>{" "}
          property of our hash function.
        </div>

        <div className="text-sm">
          Once we have our random output, based on the amount of tickets, prizes
          and rules of the raffle (can someone win more than once, etc), we can
          output a list of winning tickets for the world to see.
        </div>
      </motion.div>
    </div>
  );
};

export default Explainer;
