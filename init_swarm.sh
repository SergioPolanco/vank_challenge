# if [ "$(docker info | grep Swarm | sed 's/Swarm: //g')" == "inactive" ]; then
#   docker swarm init
#   echo Swarm mode initialized;
# else
#   echo Docker Swarm mode is already running;
# fi

case "$(docker info --format '{{.Swarm.LocalNodeState}}')" in
  inactive)
    echo "Node is not in a swarm cluster"
    docker swarm init;;
  pending)
    echo "Node is not in a swarm cluster"
    docker swarm init;;
  active)
    echo "Node is in a swarm cluster";;
  locked)
    echo "Node is in a locked swarm cluster";;
  error)
    echo "Node is in an error state";;
  *)
    echo "Unknown state $(docker info --format '{{.Swarm.LocalNodeState}}')";;
esac