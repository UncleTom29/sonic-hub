export const SEARCH_KNOWLEDGE_PROMPT = 
`This tool searches a vector database that is filled with information about blockchain protocols and concepts.

You should call this tool when a user asks a question about a specific protocol or concept that you need specific or up-to-date information about.

There are documents cover:

Sonic docs
Yearn.fi docs and guides (trade aggregator)
1inch docs (decentralized exchange)
Footprint Analytics docs (token and trading analytics)
Sushiswap docs (liquidity mining)
Curve DAO docs (decentralized exchange)
Solv Protocol docs (sonic liquid staking)
Aave docs (yield farming vaults and borrow/lend)
Aave docs (borrow/lend protocol)

After searching the docs, answer the user's question with the most relevant information.`