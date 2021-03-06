//JavaScript-C24.2.0 (SpiderMonkey)

//link of compiler where i run this code
//https://rextester.com/l/js_online_compiler

function Graph(){
        this.adjList = {}
        this.pathWeight = {}
        this.allpath = []
        this.minValue = Infinity
        this.minValuePath = ''
        this.optimalValue = Infinity
        this.optimalPath = ''
    }

    Graph.prototype.addVertex = function(vertex){
        this.adjList[vertex] = []
    }
    
    Graph.prototype.edgeWeight = function(v1,v2,w){
        this.adjList[v1][v2]['w'] = w
        //print(this.adjList[v1][v2]['w'])
    }
    
    Graph.prototype.optimalEdgeWeight = function(v1, v2, w, t){
        var s = 100 - t;
        var tw = w/s;
        this.adjList[v1][v2]['ow'] = tw
        //print(this.adjList[v1][v2]['ow'])
    }
    
    Graph.prototype.addEdge = function(vertex1, vertex2, w, t){
        this.adjList[vertex1].push(vertex2)
        this.adjList[vertex1][vertex2] = []
        this.edgeWeight(vertex1, vertex2, w);
        this.optimalEdgeWeight(vertex1, vertex2, w, t);
    }
    
    Graph.prototype.appendAllPath = function(path){
        this.allpath = this.allpath + path + " ";
    }
    
    Graph.prototype.findshortpath = function(){
        var listSplitOfPath = this.allpath.split(" ")
        //print(listSplitOfPath.length)
        for(j=0;j<listSplitOfPath.length;j++){
            var executePath = listSplitOfPath[j]
            if(!executePath==''){
                /*print("sorry")
                }else{
                print(executePath + "ep")
                }*/
                var node = executePath.split(",")
                /*for(k=0;k<node.length;k++){
                    print(node[k])
                }*/
                this.calculateShortPath(0,node,0);
                this.calculateOptimalPath(0,node,0);
            }
        }
        print("Shortest Path => " + this.minValuePath + " " + this.minValue)
        print("Optimal Path => " + this.optimalPath + " " + this.optimalValue)
    }
    
    Graph.prototype.calculateShortPath = function(index, node, weightpath){
        
            weightpath = weightpath + this.adjList[node[index]][node[index+1]]['w']
            //print(weightpath)
            if(node[index+1]==node[node.length-1]){
              //print(weightpath)
              if(this.minValue>weightpath){
                  this.minValue=weightpath
                  this.minValuePath=node
              }
              return
            }
            index = index + 1;
            this.calculateShortPath(index, node, weightpath);
    }
    
    Graph.prototype.calculateOptimalPath = function(index, node, weightpath){
        
            weightpath = weightpath + this.adjList[node[index]][node[index+1]]['ow']
            //print(weightpath)
            if(node[index+1]==node[node.length-1]){
              //print(weightpath)
              if(this.optimalValue>weightpath){
                  this.optimalValue=weightpath
                  this.optimalPath=node
              }
              return
            }
            index = index + 1;
            this.calculateOptimalPath(index, node, weightpath);
    }
    
    Graph.prototype.dfs = function(s,d){
        const visited = {}
        const path = []
        path.push(s)
        this._dfsUtil(s, d, visited, path)
        this.findshortpath()
    }
    Graph.prototype._dfsUtil = function(v, t, visited, lp){
        visited[v]=true;
        if(v==t){
            this.appendAllPath(lp);
            visited[v]=false
            return
        }
        const neighbors = this.adjList[v]
        for(let i=0; i<neighbors.length; i++){
            const neighbor = neighbors[i]
            if(!visited[neighbor]){
                lp.push(neighbor);
                this._dfsUtil(neighbor, t, visited, lp);
                lp.pop(neighbor);
            }
        }
        visited[v]=false
    }

    const graph = new Graph()

    graph.addVertex('start')
    graph.addVertex('p1')
    graph.addVertex('p2')
    graph.addVertex('p3')
    graph.addVertex('p4')
    graph.addVertex('end')

    graph.addEdge('start', 'p1', 25, 25)
    graph.addEdge('start', 'p2', 40, 24)
    graph.addEdge('p1', 'p3', 20, 20)
    graph.addEdge('p2', 'p3', 20, 20)
    graph.addEdge('p2', 'end', 23, 23)
    graph.addEdge('p3', 'end', 21, 21)
    graph.addEdge('p3', 'p2', 20, 20)
    graph.addEdge('p3','p4', 25, 25)
    graph.addEdge('p4','end', 23, 23)
    
    graph.dfs('start','end')
    
    //graph.findoptimalpath()
