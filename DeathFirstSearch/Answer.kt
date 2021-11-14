import java.util.*

class Node(var children: MutableList<Int> = ArrayList(), var gateway: Boolean = false) {
    override fun toString(): String {
        return "children  ${getString()} \n gateway: $gateway"
    }

    private fun getString(): String {
        var res = ""
        children.forEach { res += "$it " }
        return res
    }
}

class AnswerKt {

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            val input = Scanner(System.`in`)
            val N = input.nextInt() // the total number of nodes in the level, including the gateways
            val L = input.nextInt() // the number of links
            val E = input.nextInt() // the number of exit gateways
            val graph = init(N)
            for (i in 0 until L) {
                val N1 = input.nextInt() // N1 and N2 defines a link between these nodes
                val N2 = input.nextInt()
                graph[N1].children.add(N2)
                graph[N2].children.add(N1)
            }
            for (i in 0 until E) {
                val EI = input.nextInt() // the index of a gateway node
                graph[EI].gateway = true
            }
            showGraph(graph)

            // game loop
            while (true) {
                val SI = input.nextInt() // The index of the node on which the Bobnet agent is positioned this turn
                System.err.println("\n\nVirus current node: $SI")


                // Example: 0 1 are the indices of the nodes you wish to sever the link between
                println(getNextLink(SI, graph))
            }
        }


        private fun init(size: Int): List<Node> {
            val graph = mutableListOf<Node>()
            repeat(size) {
                graph.add(Node())
            }
            return graph
        }

        private fun showGraph(graph: List<Node>) {
            System.err.println("Graph: \n")
            for (i in graph.indices) {
                System.err.println("Node: " + i + " " + graph[i])
            }
        }

        private fun getNextLink(currentPosition: Int, graph: List<Node>): String {
            val currentVirus= graph[currentPosition]
            var targetNode = 0
            for (i in currentVirus.children.indices) {
                val childIndex = currentVirus.children[i]
                targetNode = childIndex
                if (graph[childIndex].gateway) {
                    targetNode = childIndex
                    break
                }
            }
            System.err.println("getNextLink: $currentPosition $targetNode")
            return "$currentPosition $targetNode"
        }
    }
}